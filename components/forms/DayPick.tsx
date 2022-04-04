import { useEffect, useState } from 'react'
import { useTimetable } from '../../contexts/Timetable'
import { HEBREW_SHORT_DAYS } from '../../hooks/useHebrewDate'
import { DayOfWeek } from '../../interfaces'
import { SupportedLesson } from '../timetable/Timetable'
import Button from './Button'

export interface DayPickProps {
  day: DayOfWeek
  timetable?: SupportedLesson[][]
  onChange(index): unknown
  className?: string
}

export default function DayPick({
  className,
  day,
  timetable = useTimetable().lessons,
  onChange = () => {},
}: DayPickProps) {
  const [value, setValue] = useState(day)

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  return (
    <div className={`flex w-[full] justify-between items-center ${className}`}>
      {HEBREW_SHORT_DAYS.filter((day, index) =>
        timetable && timetable.length > 0
          ? timetable[index].filter((lesson) => 'subject' in lesson).length > 0
          : true
      ).map((day, index) => (
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
