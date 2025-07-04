
import type { ColumnDef } from '@tanstack/react-table';
import type { NWSAlert } from '../types'
import { cn } from "../lib/utils";

const getSeverityColor = (severity?: string) => {
  switch (severity?.toLowerCase()) {
    case 'extreme': return 'bg-red-600 text-white';
    case 'severe': return 'bg-red-500 text-white';
    case 'moderate': return 'bg-yellow-500 text-white';
    case 'minor': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

type AlertCellValue = string | React.ReactNode;

export function createColumns(): ColumnDef<NWSAlert, AlertCellValue>[] {

  return [
    {
      accessorKey: 'properties.severity',
      id: 'severity',
      header: 'Severity',
      cell: ({ row }) => (
        <span className={cn(
          "px-2 py-1 rounded text-xs",
          getSeverityColor(row.original.properties.severity)
        )}>
          {row.original.properties.severity}
        </span>
      ),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'properties.event',
      id: 'event',
      header: 'Event Type',
      cell: (info) => (
        <span className="font-medium">{String(info.getValue() || '')}</span>
      ),
    },
    {
      accessorKey: 'properties.areaDesc',
      id: 'areas',
      header: 'Areas Affected',
      cell: (info) => (
        <span className="text-sm">{String(info.getValue() || '')}</span>
      ),
    },
    {
      accessorKey: 'properties.status',
      id: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() as string;
        const colorClass = status?.toLowerCase() === 'actual' ? 'text-green-600' :
          status?.toLowerCase() === 'expired' ? 'text-red-600' :
            'text-slate-600';
        return (
          <span className={cn("font-medium", colorClass)}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: 'properties.effective',
      id: 'effective',
      header: 'Effective Time',
      cell: (info) => {
        const value = info.getValue() as string | undefined;
        return (
          <span className="text-sm">
            {value ? new Date(value).toLocaleString() : 'N/A'}
          </span>
        )
      },
    },
    {
      accessorKey: 'properties.expires',
      id: 'expires',
      header: 'Expires',
      cell: (info) => {
        const value = info.getValue() as string | undefined;
        return (
          <span className="text-sm">
            {value ? new Date(value).toLocaleString() : 'No expiration'}
          </span>
        );
      },
    }

  ]
}