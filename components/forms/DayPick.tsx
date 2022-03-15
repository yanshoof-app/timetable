import { useEffect, useState } from 'react'
import { HEBREW_SHORT_DAYS } from '../../hooks/useHebrewDate'
import { DayOfWeek } from '../../interfaces'
import Button from './Button'

export interface DayPickProps {
  day: DayOfWeek
  onChange(index): unknown
  className?: string
}

export default function DayPick({
  className,
  day,
  onChange = () => {},
}: DayPickProps) {
  const [value, setValue] = useState(day)

  useEffect(() => {
    onChange(value)
  }, [value])
  return (
    <div className={`flex w-[full] justify-between items-center ${className}`}>
      {HEBREW_SHORT_DAYS.map((day, index) => (
        <Button
          className={`${
            value !== index && 'text-black bg-transparent'
          } font-semibold
           m-0`}
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
