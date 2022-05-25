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
  return (
    <div className={`flex w-[full] justify-between items-center ${className}`}>
      {HEBREW_SHORT_DAYS.map(
        (currentDay, index) =>
          dayFilterer(currentDay, index) && (
            <Button
              className={`${
                day !== index && 'text-black dark:text-gray-300 bg-transparent'
              } font-semibold`}
              onClick={() => {
                onChange(index as DayOfWeek)
              }}
              key={index}
            >
              {currentDay}
            </Button>
          )
      )}
    </div>
  )
}
