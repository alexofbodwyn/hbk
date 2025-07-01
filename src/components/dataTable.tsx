import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type Row,
} from '@tanstack/react-table';
import { useState, useMemo, lazy, Suspense } from 'react';
import { createColumns } from './columns';
import type { NWSAlert } from '../types';

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from './ui/table'

const AlertDetailView = lazy(() => import('./alertDetailView'));

function DataTable({
  data, // Note: passing data as prop rather than using query key for seperation and reusability 
  severityFilter
}: {
  data: NWSAlert[];
  severityFilter: string;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [toggleDetailView, setToggleDetailView] = useState<boolean>(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const columns = useMemo(
    () =>
      createColumns(),
    [],
  );

  const filteredData = useMemo(() => {
    if (severityFilter === "all") return data;
    return data.filter(alert =>
      alert.properties.severity?.toLowerCase() === severityFilter.toLowerCase()
    );
  }, [data, severityFilter]);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleClick = (rowData: Row<NWSAlert>) => {
    setSelectedAlert(rowData.original);
    setToggleDetailView(true);
  }

  const handleCloseDetail = () => {
    setToggleDetailView(false);
    setSelectedAlert(null);
  }

  return (
    <div className="p-5">
      <Table className="w-full max-w-full">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className="bg-gray-50 border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() && (
                      <span>{header.column.getIsSorted() === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleClick(row)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="border border-gray-300 px-4 py-2 whitespace-break-spaces">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedAlert && (
        // Note: Single instance outside table to preserve semantic HTML structure
        <Suspense fallback={<div>Loading...</div>}>
          <AlertDetailView
            open={toggleDetailView}
            setOpen={handleCloseDetail}
            alert={selectedAlert}
          />
        </Suspense>
      )}
    </div>
  );
}

export default DataTable
