import { sessionStorageUtils, isBrowser } from './sessionStorage'

// Middleware that saves state to session storage after each action
export const sessionStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  
  // Only save to session storage in browser environment and avoid hydration action
  if (isBrowser && action.type !== 'tasks/hydrateFromStorage') {
    // Small delay to ensure state is updated
    setTimeout(() => {
      try {
        const state = store.getState()
        sessionStorageUtils.saveState({
          tasks: state.tasks
        })
      } catch (error) {
        console.warn('Failed to save to session storage:', error)
      }
    }, 0)
  }
  
  return result
}

// Helper to load initial state from session storage
export const loadPersistedState = () => {
  if (!isBrowser) {
    return undefined
  }
  
  const persistedState = sessionStorageUtils.loadState()
  return persistedState
}