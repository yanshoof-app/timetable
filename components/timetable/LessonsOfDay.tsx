import { useFullTimetable } from '../../contexts/FullTimetable'
import { HEBREW_DAYS } from '../../hooks/useHebrewDate'
import useRanges from '../../hooks/useRanges'
import { DayOfWeek, HourOfDay, LessonOrMultiple } from '../../interfaces'
import { SkeletonLesson } from './Lesson/Skeleton'
import LessonPick from './LessonPick'

export interface LessonsOfDayProps {
  day: DayOfWeek
  hourSet: HourOfDay[]
}

export default function LessonsOfDay({ day, hourSet }: LessonsOfDayProps) {
  const { timetable } = useFullTimetable()
  const rangedHours = useRanges(hourSet)
  return (
    <div className="flex flex-col gap-2 py-2 dark:text-gray-300">
      <p className="font-semibold text-lg px-3">{`יום ${HEBREW_DAYS[day]}`}</p>
      <div className="flex flex-col gap-4">
        {rangedHours.map((hours, index) =>
          timetable[day] && timetable[day][hours[0]] ? (
            <LessonPick day={day} hour={hours} key={index} isEditing />
          ) : (
            <SkeletonLesson key={index} />
          )
        )}
      </div>
    </div>
  )
}
