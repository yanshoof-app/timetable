import { useEffect, useMemo, useState } from 'react'
import { HEBREW_SHORT_DAYS } from '../../hooks/useHebrewDate'
import { DayOfWeek } from '../../interfaces'
import Button from './Button'

export interface DayPickProps {
  day: DayOfWeek
  onChange(index): unknown
  className?: string
  dayFilterer?(dayName: string, day: number): boolean
}

export default function DayPick({
  className,
  day,
  onChange = () => {},
  dayFilterer = () => true,
}: DayPickProps) {
  const [value, setValue] = useState(day)

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  const filteredDays = useMemo(
    () => HEBREW_SHORT_DAYS.filter(dayFilterer),
    [dayFilterer]
  )

  return (
    <div className={`flex w-[full] justify-between items-center ${className}`}>
      {filteredDays.map((day, index) => (
        <Button
          className={`${
            value !== index && 'text-black bg-transparent'
          } font-semibold mx-0 my-0`}
          onClick={() => {
            setValue(index as DayOfWeek)
          }}
          key={index}
        >
          {day}
        </Button>
      ))}
    </div>
  )
}
