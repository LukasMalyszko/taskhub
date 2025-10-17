// Session storage utilities for Redux state persistence

const SESSION_STORAGE_KEY = 'taskhub_tasks'

export const sessionStorageUtils = {
  // Save state to session storage
  saveState: (state: any) => {
    try {
      const serializedState = JSON.stringify(state)
      sessionStorage.setItem(SESSION_STORAGE_KEY, serializedState)
    } catch (error) {
      console.warn('Failed to save state to session storage:', error)
    }
  },

  // Load state from session storage
  loadState: () => {
    try {
      const serializedState = sessionStorage.getItem(SESSION_STORAGE_KEY)
      if (serializedState === null) {
        return undefined // Let Redux use initial state
      }
      return JSON.parse(serializedState)
    } catch (error) {
      console.warn('Failed to load state from session storage:', error)
      return undefined
    }
  },

  // Clear session storage
  clearState: () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear session storage:', error)
    }
  }
}

// Check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'