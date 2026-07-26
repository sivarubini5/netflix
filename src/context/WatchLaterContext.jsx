import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'nxtflix_watch_later'

const WatchLaterContext = createContext(undefined)

function readInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function WatchLaterProvider({ children }) {
  const [watchLater, setWatchLater] = useState(readInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchLater))
  }, [watchLater])

  function isInWatchLater(id) {
    return watchLater.some((movie) => movie.id === id)
  }

  function toggleWatchLater(movie) {
    setWatchLater((prev) => {
      const exists = prev.some((item) => item.id === movie.id)
      if (exists) {
        return prev.filter((item) => item.id !== movie.id)
      }
      return [...prev, movie]
    })
  }

  const value = { watchLater, isInWatchLater, toggleWatchLater }

  return (
    <WatchLaterContext.Provider value={value}>
      {children}
    </WatchLaterContext.Provider>
  )
}

export function useWatchLater() {
  const context = useContext(WatchLaterContext)
  if (context === undefined) {
    throw new Error('useWatchLater must be used within a WatchLaterProvider')
  }
  return context
}
