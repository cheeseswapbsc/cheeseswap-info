/**
 * Rate limiter utility to prevent hitting API limits
 */

class RateLimiter {
  constructor(maxRequestsPerSecond = 10) { // Production gateway supports ~16 req/sec (1000/min)
    this.maxRequestsPerSecond = maxRequestsPerSecond
    this.queue = []
    this.processing = false
    this.lastRequestTime = 0
    this.minDelay = 1000 / maxRequestsPerSecond // milliseconds between requests
  }

  async executeWithRetry(fn, maxRetries = 3, baseDelay = 1000) { // Shorter delays for production
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await this.execute(fn)
        return result
      } catch (error) {
        const is429 = error.message && (error.message.includes('429') || error.message.includes('Too Many Requests'))
        
        if (is429 && attempt < maxRetries - 1) {
          // Exponential backoff: 1s, 2s, 4s
          const delay = baseDelay * Math.pow(2, attempt)
          console.log(`Rate limited, retry ${attempt + 1}/${maxRetries} after ${delay}ms`)
          await new Promise(resolve => setTimeout(resolve, delay))
        } else {
          throw error
        }
      }
    }
  }

  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
      this.processQueue()
    })
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return
    }

    this.processing = true

    while (this.queue.length > 0) {
      const now = Date.now()
      const timeSinceLastRequest = now - this.lastRequestTime

      // Wait if we're going too fast
      if (timeSinceLastRequest < this.minDelay) {
        await new Promise(resolve => setTimeout(resolve, this.minDelay - timeSinceLastRequest))
      }

      const { fn, resolve, reject } = this.queue.shift()
      this.lastRequestTime = Date.now()

      try {
        const result = await fn()
        resolve(result)
      } catch (error) {
        reject(error)
      }

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, this.minDelay))
    }

    this.processing = false
  }
}

// Create singleton instances for different clients
export const mainRateLimiter = new RateLimiter(10) // 10 requests per second (production gateway supports ~16/sec)
export const blockRateLimiter = new RateLimiter(10) // 10 requests per second for blocks
