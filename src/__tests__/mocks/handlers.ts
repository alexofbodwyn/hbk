import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.weather.gov/alerts', () => {
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
      ]
    })
  })
]