import { http, HttpResponse } from 'msw'

export let lastRequest: Request | null = null

export const handlers = [
  http.get('https://api.weather.gov/alerts', ({ request }) => {
    // Capture the request for testing
    lastRequest = request

    return HttpResponse.json({
      features: [
        {
          id: 'test-alert-1',
          properties: {
            headline: 'Test Weather Alert',
            event: 'Test Event',
            severity: 'moderate'
          }
        }
      ],
      pagination: {
        next: 'https://api.weather.gov/alerts?limit=30&cursor=next-cursor-123'
      }
    })
  })
]

// Helper to reset captured request
export const resetLastRequest = () => {
  lastRequest = null
}