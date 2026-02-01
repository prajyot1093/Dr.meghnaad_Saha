// Performance Optimization Configuration

// Cache configuration
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000,      // 5 minutes
  MEDIUM: 30 * 60 * 1000,    // 30 minutes
  LONG: 24 * 60 * 60 * 1000  // 24 hours
}

// Debounce helper for search inputs
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Memoization helper
export const memoize = (fn) => {
  const cache = {}
  return (...args) => {
    const key = JSON.stringify(args)
    if (key in cache) {
      return cache[key]
    }
    const result = fn(...args)
    cache[key] = result
    return result
  }
}

// Local storage with expiry
export const CacheStorage = {
  set: (key, value, duration = CACHE_DURATION.MEDIUM) => {
    const expiresAt = Date.now() + duration
    localStorage.setItem(key, JSON.stringify({ value, expiresAt }))
  },

  get: (key) => {
    const item = localStorage.getItem(key)
    if (!item) return null

    const { value, expiresAt } = JSON.parse(item)
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key)
      return null
    }

    return value
  },

  remove: (key) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  }
}

// Image optimization helper
export const getOptimizedImageUrl = (url, width = 400) => {
  if (!url) return null
  // In production, use image CDN like Cloudinary or Imgix
  return url
}

// Performance monitoring
export const PerformanceMonitor = {
  metrics: {},

  mark: (label) => {
    performance.mark(label)
  },

  measure: (label, startMark, endMark) => {
    try {
      performance.measure(label, startMark, endMark)
      const measure = performance.getEntriesByName(label)[0]
      this.metrics[label] = measure.duration
      console.log(`[PERF] ${label}: ${measure.duration.toFixed(2)}ms`)
    } catch (error) {
      console.warn(`Could not measure ${label}`)
    }
  },

  getMetrics: () => this.metrics,

  clearMetrics: () => {
    this.metrics = {}
    performance.clearMarks()
    performance.clearMeasures()
  }
}

// Network request throttling
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading intersection observer
export const observeElement = (element, callback) => {
  if (!('IntersectionObserver' in window)) {
    callback()
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(element)
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(element)
}

export default {
  CACHE_DURATION,
  debounce,
  memoize,
  CacheStorage,
  getOptimizedImageUrl,
  PerformanceMonitor,
  throttle,
  observeElement
}
