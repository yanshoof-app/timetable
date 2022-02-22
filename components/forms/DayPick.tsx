import { useEffect, useState } from 'react'
import { HEBREW_SHORT_DAYS } from '../../hooks/useHebrewDate'
import { DayOfWeek } from '../../interfaces'
import Button from './Button'

export interface DayPickProps {
  day: DayOfWeek
  value: DayOfWeek
  onChange(index): unknown
  className?: string
}

export default function DayPick({ day, onChange = () => {} }: DayPickProps) {
  const [value, setValue] = useState(day)

  useEffect(() => {
    onChange(value)
    console.log(value)
  }, [value])
  return (
    <div className="flex w-[full] justify-between items-center pr-[1rem] pl-[1rem]">
      {HEBREW_SHORT_DAYS.map((day, index) => (
        <Button
          className={`${
            value !== index && 'text-black bg-transparent'
          } font-semibold
           m-0`}
          onClick={() => {
            setValue(index as DayOfWeek)
          }}
        >
          {day}
        </Button>
      ))}
    </div>
  )
}
