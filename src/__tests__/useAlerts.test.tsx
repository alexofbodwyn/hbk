// src/__tests__/useAlerts.test.ts

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAlerts } from '../hooks/useAlerts'
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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

  it('should fetch alerts from the API', async () => {
    const queryClient = new QueryClient()

    const { result } = renderHook(() => useAlerts(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    console.log(result.current)
  })
})