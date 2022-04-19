import { ReactNode } from 'react'
import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  isAnyLessonObj,
  ITeacherLesson,
} from '../../interfaces'
import { isArray } from '../../utils/data/arrays'
import Lesson from './Lesson'
import LessonPick from './LessonPick'

export type SupportedLesson = ILesson | ILesson[] | ITeacherLesson | {}

export const MIN_HOUR = 1

const FindLastLesson = (timetable) => {
  let lastLesson: number
  for (let lesson in timetable) {
    isAnyLessonObj(timetable[lesson]) && (lastLesson = Number(lesson))
  }
  return lastLesson as HourOfDay
}

const ShowLesson = (
  lesson: SupportedLesson,
  index: HourOfDay,
  lastLesson: HourOfDay
) => {
  return (
    isAnyLessonObj(lesson) ||
    (index > MIN_HOUR - 1 && index <= lastLesson) ||
    isArray(lesson)
  )
}

export interface TimetableProps {
  day: DayOfWeek
  isEditing?: boolean
  timetable: SupportedLesson[][]
  className?: string
  windowSkeleton?: () => JSX.Element
}

export default function Timetable({
  day = 0,
  isEditing = false,
  timetable,
  className = '',
  windowSkeleton: WindowSkeleton,
}: TimetableProps) {
  const lastLesson = FindLastLesson(timetable[day])

  /*const { studyGroupMap } = useStorage()
  const { clearUnusedStudyGroups } = useTimetable()

  useEffect(() => clearUnusedStudyGroups(), [studyGroupMap])
*/

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {timetable[day] &&
        timetable[day].map(
          (lesson, hour) =>
            (ShowLesson(lesson, hour as HourOfDay, lastLesson) ||
              WindowSkeleton) &&
            (Array.isArray(lesson) ? (
              <LessonPick
                day={day}
                hour={hour as HourOfDay}
                key={`${day}${hour}`}
                isEditing={isEditing}
              />
            ) : isAnyLessonObj(lesson) || !WindowSkeleton ? (
              <Lesson
                lesson={lesson}
                hour={hour as HourOfDay}
                key={`${day}${hour}`}
              />
            ) : (
              <WindowSkeleton />
            ))
        )}
    </div>
  )
}
