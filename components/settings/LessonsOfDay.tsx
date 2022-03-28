import { HEBREW_DAYS } from '../../hooks/useHebrewDate'
import useRanges from '../../hooks/useRanges'
import { DayOfWeek, HourOfDay, LessonOrMultiple } from '../../interfaces'
import { SkeletonLesson } from '../timetable/Lesson/Skeleton'
import LessonPick from '../timetable/LessonPick'

export interface LessonsOfDayProps {
  day: DayOfWeek
  hourSet: HourOfDay[]
  timetable: LessonOrMultiple[][]
}

export default function LessonsOfDay({
  day,
  hourSet,
  timetable,
}: LessonsOfDayProps) {
  const rangedHours = useRanges(hourSet)
  return (
    <div className="flex flex-col gap-2 py-2">
      <p className="font-semibold text-lg px-5">{`יום ${HEBREW_DAYS[day]}`}</p>
      <div className="flex flex-col gap-4">
        {rangedHours.map((hours, index) =>
          timetable[day] ? (
            <LessonPick
              day={day}
              hour={hours as HourOfDay[]}
              key={index}
              editable
            ></LessonPick>
          ) : (
            <SkeletonLesson key={index} />
          )
        )}
      </div>
    </div>
  )
}
