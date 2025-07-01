import './App.css';
import { useState, useMemo } from 'react'
import { useAlerts } from './hooks/useAlerts';
import DataTable from './components/dataTable';
import { Pagination } from './components/pagination';
import { Header } from './components/header';

function App() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAlerts({
    params: {
      ...(startDate && { start: startDate }),
      ...(endDate && { end: endDate })
    },
  });

  const handleDateRangeChange = (newStartDate: string | null, newEndDate: string | null) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleSeverityFilterChange = (severity: string) => {
    setSeverityFilter(severity);
  };

  const allAlerts = useMemo(() =>
    data?.pages?.flatMap(page => page.features) || [],
    [data?.pages]
  ) // Note: flattens paginated responses into continuous list

  if (isLoading) {
    return <div className="p-5">Loading alerts...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Error loading alerts: {error.message}</div>;
  }

  if (allAlerts.length === 0) {
    return (
      <div>
        <Header
          onDateRangeChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          results={0}
          severityFilter={severityFilter}
          onSeverityFilterChange={handleSeverityFilterChange}
        />
        <div className="p-5">
          {startDate || endDate ?
            'No alerts found for the selected date range.' :
            'No active alerts found.'
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header
        onDateRangeChange={handleDateRangeChange}
        startDate={startDate}
        endDate={endDate}
        results={allAlerts.length}
        severityFilter={severityFilter}
        onSeverityFilterChange={handleSeverityFilterChange}
      />
      <DataTable
        data={allAlerts}
        severityFilter={severityFilter}
      />
      <Pagination
        pagination={{ next: hasNextPage ? 'has-more' : undefined }}
        onLoadMore={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        totalLoaded={allAlerts.length}
      />
    </div>
  );
}

export default App
