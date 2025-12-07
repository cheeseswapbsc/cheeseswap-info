import { mainRateLimiter } from './rateLimiter'

const QUERY_TTL_MS = 60 * 1000 // 60 seconds

// Map<clientName, Map<key, {ts, value}>>
const caches = new Map()

function getClientKey(client) {
  // prefer to use the client's link URI if available, else fallback
  try {
    const link = client && client.link
    if (link && link.options && link.options.uri) return link.options.uri
  } catch (e) {
    // ignore
  }
  return 'default'
}

function getQueryText(query) {
  return (query && query.loc && query.loc.source && query.loc.source.body) || ''
}

export async function queryWithCache(client, options, ttl = QUERY_TTL_MS) {
  const clientKey = getClientKey(client)
  let cache = caches.get(clientKey)
  if (!cache) {
    cache = new Map()
    caches.set(clientKey, cache)
  }

  const queryText = getQueryText(options && options.query)
  const vars = options && options.variables ? options.variables : {}
  const key = queryText + '|' + JSON.stringify(vars)

  const bypassCache =
    (options && options.fetchPolicy && (options.fetchPolicy === 'network-only' || options.fetchPolicy === 'no-cache')) ||
    (options && options.context && options.context.forceRefresh)

  if (!bypassCache) {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.ts < ttl) {
      return cached.value
    }
  }

  // execute through rate limiter
  const exec = () => client.query(options)
  const result = await mainRateLimiter.executeWithRetry(exec)

  if (!bypassCache) {
    try {
      cache.set(key, { ts: Date.now(), value: result })
    } catch (e) {
      // ignore
    }
  }

  return result
}

export function clearAllQueryCaches() {
  caches.forEach(c => c.clear())
}

export function clearClientCache(client) {
  const clientKey = getClientKey(client)
  const cache = caches.get(clientKey)
  if (cache) cache.clear()
}
