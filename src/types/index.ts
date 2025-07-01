// src/types/nws.ts

export interface NWSAlert {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  } | null;
  properties: {
    '@id': string;
    '@type': string;
    id: string;
    areaDesc: string;
    geocode: {
      FIPS6: string[];
      UGC: string[];
    };
    affectedZones: string[];
    references: Array<{
      '@id': string;
      identifier: string;
      sender: string;
      sent: string;
    }>;
    sent: string;
    effective: string;
    onset: string | null;
    expires: string;
    ends: string | null;
    status: 'Actual' | 'Exercise' | 'System' | 'Test' | 'Draft';
    messageType: 'Alert' | 'Update' | 'Cancel' | 'Ack' | 'Error';
    category: 'Geo' | 'Met' | 'Safety' | 'Security' | 'Rescue' | 'Fire' | 'Health' | 'Env' | 'Transport' | 'Infra' | 'CBRNE' | 'Other';
    severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
    certainty: 'Observed' | 'Likely' | 'Possible' | 'Unlikely' | 'Unknown';
    urgency: 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown';
    event: string;
    sender: string;
    senderName: string;
    headline: string;
    description: string;
    instruction: string | null;
    response: 'Shelter' | 'Evacuate' | 'Prepare' | 'Execute' | 'Avoid' | 'Monitor' | 'Assess' | 'AllClear' | 'None';
    parameters: Record<string, string[]>;
  };
}

export interface NWSAlertsResponse {
  '@context': string[];
  type: 'FeatureCollection';
  features: NWSAlert[];
  title: string;
  updated: string;
  pagination?: {
    next?: string;
  };
}

export interface AlertsQueryParams {
  active?: boolean;
  start?: string; // ISO 8601 date string
  end?: string;   // ISO 8601 date string
  status?: string;
  message_type?: string;
  event?: string;
  code?: string;
  area?: string;
  point?: string;
  region?: string;
  region_type?: string;
  zone?: string;
  urgency?: string;
  severity?: string;
  certainty?: string;
  limit?: number;
  cursor?: string;
}
