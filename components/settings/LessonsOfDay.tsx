import { useFullTimetable } from '../../contexts/FullTimetable'
import { HEBREW_DAYS } from '../../hooks/useHebrewDate'
import useRanges from '../../hooks/useRanges'
import { DayOfWeek, HourOfDay } from '../../interfaces'
import Layout from '../Layout'
import LessonPick from '../timetable/LessonPick'

export interface LessonsOfDayProps {
  day: DayOfWeek
  hourSet: HourOfDay[]
}

export default function LessonsOfDay({ day, hourSet }: LessonsOfDayProps) {
  const { timetable } = useFullTimetable()
  const rangedHours = useRanges(hourSet)
  return timetable[day] ? (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-xl px-5">{`יום ${HEBREW_DAYS[day]}`}</p>
      {rangedHours.map((hours, index) => (
        <LessonPick
          day={day}
          hour={hours as HourOfDay[]}
          key={index}
          editable
        ></LessonPick>
      ))}
    </div>
  ) : (
    <div></div>
  )
}
