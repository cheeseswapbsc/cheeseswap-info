import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// The Graph Production API configuration
const GRAPH_API_KEY = process.env.REACT_APP_GRAPH_API_KEY

// CheeseSwap subgraph endpoints
// If using production gateway, API key should be in the URL or headers
const CHEESESWAP_SUBGRAPH_URL = 
  process.env.REACT_APP_CHEESESWAP_SUBGRAPH || 
  'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v2'

const BSC_BLOCKS_SUBGRAPH_URL = 
  process.env.REACT_APP_BLOCKS_SUBGRAPH ||
  'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'

// Create HTTP link with optional API key header
const createHttpLink = (uri) => {
  const headers = {}
  
  // If using a separate API key (not in URL), add it to headers
  // This is for alternative auth methods, but gateway URLs typically include the key
  if (GRAPH_API_KEY && !uri.includes(GRAPH_API_KEY)) {
    headers['Authorization'] = `Bearer ${GRAPH_API_KEY}`
  }
  
  return new HttpLink({
    uri,
    headers
  })
}

export const client = new ApolloClient({
  link: createHttpLink(CHEESESWAP_SUBGRAPH_URL),
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        keyFields: ['id']
      },
      Pair: {
        keyFields: ['id']
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first' // Use cache first to reduce API calls
    },
    query: {
      fetchPolicy: 'cache-first', // Changed from 'no-cache' to reduce rate limit issues
      errorPolicy: 'all'
    }
  },
  // Prevent freezing objects in development
  assumeImmutableResults: false
})

export const blockClient = new ApolloClient({
  link: createHttpLink(BSC_BLOCKS_SUBGRAPH_URL),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first'
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all'
    }
  }
})

// Health client removed due to CORS issues with The Graph's index-node endpoint
// Block numbers will be fetched from the blocks subgraph instead
export const healthClient = blockClient

export const v1Client = new ApolloClient({
  link: new HttpLink({
    uri: CHEESESWAP_SUBGRAPH_URL
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first'
    },
    query: {
      fetchPolicy: 'cache-first', // Changed from 'no-cache' to reduce rate limit issues
      errorPolicy: 'all'
    }
  }
})
