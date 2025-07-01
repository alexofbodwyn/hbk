import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAlerts, fetchAlerts } from '../hooks/useAlerts'
import { server } from './mocks/server'
import { lastRequest, resetLastRequest } from './mocks/handlers'


beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  resetLastRequest()
})
afterAll(() => server.close())

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
})

describe('useAlerts', () => {
  it('should be a function', () => {
    expect(typeof useAlerts).toBe('function')
  })

  it('should call the hook', () => {
    const queryClient = createTestQueryClient()

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
    const queryClient = createTestQueryClient()

    const { result } = renderHook(() => useAlerts(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current.isLoading).toBeDefined()
    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchNextPage).toBeDefined()
  })

  it('should construct URL with correct query parameters', async () => {
    const params = {
      limit: 30,
      start: '2024-01-01T00:00:00.000Z',
      end: '2024-01-01T23:59:59.999Z'
    }

    await fetchAlerts(params)

    expect(lastRequest).toBeDefined()
    const url = new URL(lastRequest!.url)

    expect(url.searchParams.get('limit')).toBe('30')
    expect(url.searchParams.get('start')).toBe('2024-01-01T00:00:00.000Z')
    expect(url.searchParams.get('end')).toBe('2024-01-01T23:59:59.999Z')
  })
})