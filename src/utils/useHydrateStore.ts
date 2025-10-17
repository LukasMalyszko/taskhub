import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hydrateFromStorage } from '@/store/taskSlice'
import { sessionStorageUtils, isBrowser } from './sessionStorage'

export const useHydrateStore = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Only run on client side after mount
    if (isBrowser) {
      const persistedState = sessionStorageUtils.loadState()
      if (persistedState && persistedState.tasks) {
        dispatch(hydrateFromStorage(persistedState.tasks))
      }
    }
  }, [dispatch])
}