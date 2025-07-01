import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface SeverityFilterProps {
  value?: string;
  onValueChange?: (value: string) => void;
  id: string
}

export function SeverityFilter({ value, onValueChange }: SeverityFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="All severities" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Severity Levels</SelectLabel>
          <SelectItem value="all">All Severities</SelectItem>
          <SelectItem value="extreme">Extreme</SelectItem>
          <SelectItem value="severe">Severe</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="minor">Minor</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}