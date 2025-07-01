import { useState } from "react"
import { ChevronDownIcon, X } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Label } from "./ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

import { SeverityFilter } from "./severityFilter"

interface HeaderProps {
  onDateRangeChange: (startDate: string | null, endDate: string | null) => void;
  onSeverityFilterChange: (severity: string) => void;
  startDate?: string | null;
  endDate?: string | null;
  severityFilter?: string;
  results: number;
}

export function Header({
  onDateRangeChange,
  onSeverityFilterChange,
  startDate,
  endDate,
  severityFilter = "all",
  results = 0
}: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (startDate && endDate) {
      return {
        from: new Date(startDate),
        to: new Date(endDate)
      }
    }
    if (startDate) {
      return {
        from: new Date(startDate),
        to: undefined
      }
    }
    return undefined
  })

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range)

    const startISO = range?.from ? range.from.toISOString() : null
    const endISO = range?.to ? range.to.toISOString() : null
    onDateRangeChange(startISO, endISO)

    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  const clearDateRange = () => {
    setDateRange(undefined)
    onDateRangeChange(null, null)
  }

  const formatDateRange = () => {
    if (!dateRange?.from) return "Date range"

    if (dateRange.to) {
      return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
    }

    return `${dateRange.from.toLocaleDateString()} - ...`
  }

  const today = new Date()

  return (
    <div className="sticky top-0 bg-white border-b border-b-slate-200 p-5 z-10">
      <div className="flex gap-3 justify-between items-center">

        <div className="flex items-center gap-x-2">
          <h2 className="text-xl font-bold">Weather Alerts ({results})</h2>
          {dateRange?.from && (
            <div className="text-sm text-slate-600 px-1">
              {dateRange.to ? (
                <p>Showing alerts from {dateRange.from.toLocaleDateString()} to {dateRange.to.toLocaleDateString()}</p>
              ) : (
                <p>Showing alerts from {dateRange.from.toLocaleDateString()} onwards</p>
              )}
            </div>
          )}
        </div>

        <div className="w-fit flex items-center gap-x-5">
          <div className="flex gap-x-2">
            <Label htmlFor="severity-filter">Filter by:</Label>
            <SeverityFilter
              value={severityFilter}
              onValueChange={onSeverityFilterChange}
              id="severity-filter"
            />
          </div>
          <div className="flex gap-2">
            <Label htmlFor="date">
              Search by:
            </Label>
            <div className="flex gap-x-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-64 justify-between font-normal cursor-pointer"
                    aria-labelledby="date-filter-label"
                    aria-expanded={open}
                  >
                    {formatDateRange()}
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    captionLayout="dropdown"
                    numberOfMonths={2}
                    className="rounded-md border border-slate-200"
                    hidden={{ after: today }}
                  />
                </PopoverContent>
              </Popover>

              {dateRange?.from && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={clearDateRange}
                  className="shrink-0 cursor-pointer"
                  title="Clear date range"
                  aria-label="Clear date range"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}