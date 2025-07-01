"use client"

import * as React from "react"
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

interface HeaderProps {
  onDateRangeChange: (startDate: string | null, endDate: string | null) => void;
  startDate?: string | null;
  endDate?: string | null;
  results: number;
}

export function Header({
  onDateRangeChange,
  startDate,
  endDate,
  results = 0
}: HeaderProps) {
  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(() => {
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

        <h2 className="text-xl font-bold">Weather Alerts ({results})</h2>

        <div className="w-fit flex items-center">
          <Label htmlFor="date" className="px-2">
            Filter by:
          </Label>
          <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-64 justify-between font-normal"
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
                  className="rounded-md border"
                  hidden={{ after: today }}
                />
              </PopoverContent>
            </Popover>

            {dateRange?.from && (
              <Button
                variant="outline"
                size="icon"
                onClick={clearDateRange}
                className="shrink-0"
                title="Clear date range"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {dateRange?.from && (
          <div className="text-sm text-gray-600 px-1">
            {dateRange.to ? (
              <>Showing alerts from {dateRange.from.toLocaleDateString()} to {dateRange.to.toLocaleDateString()}</>
            ) : (
              <>Showing alerts from {dateRange.from.toLocaleDateString()} onwards</>
            )}
          </div>
        )}
      </div>
    </div>
  )
}