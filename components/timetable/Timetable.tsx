import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  isAnyLessonObj,
  IStudyGroup,
  ITeacherLesson,
} from '../../interfaces'
import { isArray } from '../../utils/data/arrays'
import Lesson from './Lesson'
import LessonPick from './Lesson/LessonPick'

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
  return (
    isAnyLessonObj(lesson) ||
    (index > MIN_HOUR - 1 && index <= lastLesson) ||
    isArray(lesson)
  )
}

const IsPickableLesson = (
  lesson: IStudyGroup[] | SupportedLesson,
  hour: HourOfDay,
  allEditable: boolean
) => {
  if (Array.isArray(lesson)) {
    if (lesson.length > 1) {
      return true
    } else if (hour > 7 || hour == MIN_HOUR) {
      return true
    } else if (allEditable) {
      return true
    } else {
      return false
    }
  }
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
          ShowLesson(lesson, hour as HourOfDay, lastLesson) &&
          (Array.isArray(lesson) ? (
            IsPickableLesson(lesson, hour as HourOfDay, allEditable) ? (
              <LessonPick
                options={lesson as IStudyGroup[]}
                hour={hour as HourOfDay}
                key={hour}
                onChange={() => {}}
                defaultLesson={
                  (lesson as IStudyGroup[]).length == 1 && lesson[0]
                }
              ></LessonPick>
            ) : (
              <Lesson lesson={lesson[0]} hour={hour as HourOfDay} key={hour} />
            )
          ) : (
            <Lesson lesson={lesson} hour={hour as HourOfDay} key={hour} />
          ))
      )}
    </div>
  )
}
