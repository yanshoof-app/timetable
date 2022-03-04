import { IsPickableLesson } from '../../hooks/useLessonPicks'
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
  allEditable?: boolean
  hourToScroll?: number
  timetable: SupportedLesson[][]
  className?: string
  onChange?(lesson: SupportedLesson, day: DayOfWeek, hour: HourOfDay): unknown
}

export default function Timetable({
  day = 0,
  allEditable = false,
  timetable,
  className = '',
  onChange = () => {},
}: TimetableProps) {
  const lastLesson = FindLastLesson(timetable[day])
  return (
    <div className={`flex flex-col gap-[1rem] ${className}`}>
      {timetable[day].map(
        (lesson, hour) =>
          ShowLesson(lesson, hour as HourOfDay, lastLesson) &&
          (Array.isArray(lesson) ? (
            IsPickableLesson(
              lesson,
              day as DayOfWeek,
              hour as HourOfDay,
              allEditable
            ) ? (
              <LessonPick
                options={lesson as IStudyGroup[]}
                hour={hour as HourOfDay}
                key={hour}
                onChange={(picked) => {
                  onChange(lesson[picked], day, hour as HourOfDay)
                }}
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
