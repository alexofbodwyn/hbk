import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAlerts } from '../hooks/useAlerts'

describe('useAlerts', () => {
  it('should be a function', () => {
    expect(typeof useAlerts).toBe('function')
  })

  it('should call the hook', () => {
    const queryClient = new QueryClient()

    const { result } = renderHook(() => useAlerts(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current).toBeDefined()
  })
})