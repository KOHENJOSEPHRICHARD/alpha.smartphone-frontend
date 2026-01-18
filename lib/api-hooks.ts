"use client"

import { useState, useCallback } from "react"

/**
 * Generic API hook
 * ------------------------------------------------
 * ✔ Works with ApiClient
 * ✔ Safe error handling (no crashes)
 * ✔ Clean loading + error state
 * ✔ Reusable for ALL API calls
 */
export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (requestFn: () => Promise<T>) => {
      setLoading(true)
      setError(null)

      try {
        const result = await requestFn()
        setData(result)
        return result
      } catch (err: unknown) {
        // ApiClient always throws Error with a message
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unexpected error occurred")
        }

        // Important: rethrow so component can react if needed
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Reset hook state manually if needed
   */
  const reset = () => {
    setData(null)
    setError(null)
    setLoading(false)
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,  // exposed for optimistic UI updates
    setError, // exposed for manual error control
  }
}
