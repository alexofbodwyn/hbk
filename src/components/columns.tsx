
import type { ColumnDef } from '@tanstack/react-table';
import type { NWSAlert } from '../types'

export function createColumns(): ColumnDef<NWSAlert, any>[] {

  return [
    {
      accessorKey: 'properties.severity',
      id: 'severity',
      header: 'Severity',
      cell: (info) => (
        <span className={`px-2 py-1 rounded text-xs font-medium`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'properties.event',
      id: 'event',
      header: 'Event Type',
      cell: (info) => (
        <span className="font-medium">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: 'properties.areaDesc',
      id: 'areas',
      header: 'Areas Affected',
      cell: (info) => (
        <span className="text-sm">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: 'properties.status',
      id: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        const colorClass = status === 'Active' ? 'text-green-600' :
          status === 'Expired' ? 'text-red-600' :
            'text-blue-600';
        return <span className={`font-medium ${colorClass}`}>{status}</span>;
      },
    },
    {

      accessorKey: 'properties.effective',
      id: 'effective',
      header: 'Effective Time',
      cell: (info) => (
        <span className="text-sm">
          {new Date(info.getValue()).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'properties.expires',
      id: 'expires',
      header: 'Expires',
      cell: (info) => (
        <span className="text-sm">
          {info.getValue() ? new Date(info.getValue()).toLocaleString() : 'No expiration'}
        </span>
      ),
    }

  ]
}