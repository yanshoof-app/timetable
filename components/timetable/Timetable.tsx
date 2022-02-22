import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  isAnyLessonObj,
  ITeacherLesson,
} from '../../interfaces'
import Lesson from './Lesson'

type SupportedLesson = ILesson | ILesson[] | ITeacherLesson | {}

const MIN_HOUR = 1

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
  return isAnyLessonObj(lesson) || (index > MIN_HOUR - 1 && index <= lastLesson)
}

export interface TimetableProps {
  day: DayOfWeek
  allEditable?: boolean
  hourToScroll?: number
  timetable: SupportedLesson[][]
  className?: string
}

export default function Timetable({
  day = 0,
  allEditable = false,
  timetable,
  className = '',
}: TimetableProps) {
  const lastLesson = FindLastLesson(timetable[day])
  return (
    <div className={`flex flex-col gap-[1rem] ${className}`}>
      {timetable[day].map(
        (lesson, hour) =>
          ShowLesson(lesson, hour as HourOfDay, lastLesson) && (
            <Lesson lesson={lesson} hour={hour as HourOfDay} key={hour} />
          )
      )}
    </div>
  )
}
