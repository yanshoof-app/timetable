import { useEffect, useMemo, useState } from 'react'
import { HEBREW_SHORT_DAYS } from '../../hooks/useHebrewDate'
import { DayOfWeek } from '../../interfaces'
import Button from './Button'

export type DayFilterer = (dayName: string, day: number) => boolean

export interface DayPickProps {
  day: DayOfWeek
  onChange(index): unknown
  className?: string
  dayFilterer?: DayFilterer
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

  return (
    <div className={`flex w-[full] justify-between items-center ${className}`}>
      {HEBREW_SHORT_DAYS.map(
        (day, index) =>
          dayFilterer(day, index) && (
            <Button
              className={`${
                value !== index &&
                'text-black dark:text-gray-300 bg-transparent'
              } font-semibold`}
              onClick={() => {
                setValue(index as DayOfWeek)
              }}
              key={index}
            >
              {day}
            </Button>
          )
      )}
    </div>
  )
}
