import { Button } from "./ui/button";

interface PaginationProps {
  pagination?: {
    next?: string;
    prev?: string;
  };
  onLoadMore?: () => void;
  isLoading?: boolean;
  totalLoaded?: number;
}

export function Pagination({ pagination, onLoadMore, isLoading, totalLoaded }: PaginationProps) {
  return (
    <div className="sticky bottom-0 bg-white p-5 border-t border-t-slate-200">
      <div className="flex flex-col items-center gap-3">
        {totalLoaded && (
          <div className="text-sm text-gray-600">
            Showing {totalLoaded} alerts
          </div>
        )}

        {pagination?.next && (
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
            className="px-6"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        )}

        {!pagination?.next && totalLoaded && totalLoaded > 0 && (
          <div className="text-sm text-gray-500">
            No more alerts to load
          </div>
        )}
      </div>
    </div>
  )
}