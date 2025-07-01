// src/hooks/useAlerts.ts

import { useInfiniteQuery } from '@tanstack/react-query';
import type { NWSAlertsResponse, AlertsQueryParams } from '../types';

const API_URL = 'https://api.weather.gov';

async function fetchAlerts(params: AlertsQueryParams = {}): Promise<NWSAlertsResponse> {
  const url = new URL(`${API_URL}/alerts`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/geo+json',
      'User-Agent': 'Weather-Alerts-App/1.0 (contact@example.com)',
    },
  });

  if (!response.ok) {
    throw new Error(`NWS API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

interface UseInfiniteAlertsOptions {
  params?: Omit<AlertsQueryParams, 'cursor'>;
  limit?: number;
}

export function useAlerts({ params = {}, limit = 30 }: UseInfiniteAlertsOptions = {}) {
  const baseParams = {
    ...params,
    limit: limit,
  };

  return useInfiniteQuery({
    queryKey: ['alerts', baseParams], // Simple, direct key
    queryFn: async ({ pageParam }) => {
      const alertParams = {
        ...baseParams,
        ...(pageParam && { cursor: pageParam }),
      };
      return fetchAlerts(alertParams);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.next) {
        try {
          const url = new URL(lastPage.pagination.next);
          return url.searchParams.get('cursor') || undefined;
        } catch {
          return undefined;
        }
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}