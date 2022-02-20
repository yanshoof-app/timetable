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
const MAX_HOUR = 7

const ShowLesson = (lesson: SupportedLesson, index: HourOfDay) => {
  return (
    isAnyLessonObj(lesson) || (index > MIN_HOUR - 1 && index < MAX_HOUR + 1)
  )
}
export interface TimetableProps {
  day: DayOfWeek
  allEditable?: boolean
  hourToScroll?: number
  timetable: SupportedLesson[][]
}

export default function Timetable({
  day = 0,
  allEditable = false,
  timetable,
}: TimetableProps) {
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      {timetable[day].map(
        (lesson, index) =>
          ShowLesson(lesson, index as HourOfDay) && (
            <Lesson lesson={lesson} hour={index as HourOfDay} />
          )
      )}
    </div>
  )
}
