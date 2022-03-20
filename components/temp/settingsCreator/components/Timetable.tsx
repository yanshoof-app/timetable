import { DayOfWeek, HourOfDay } from '../../../../interfaces'
import { IStudyGroup, LessonOrMultiple } from '../../../../interfaces/lesson'
import TempLesson from './Lesson'

export interface TempTimetableProps {
  timetable: IStudyGroup[][][]
  onChange(ITempAppendSetting): unknown
  day: DayOfWeek
}

export interface ITempAppendSetting {
  day: DayOfWeek
  hour: HourOfDay
  subject: string
  teacher: string
  studyGroups: IStudyGroup[]
}

export default function TempTimetable({
  timetable,
  onChange,
  day,
}: TempTimetableProps) {
  return (
    <div className="flex flex-col gap-4">
      {timetable[day].map((lesson, hour) => (
        <TempLesson
          day={day}
          lesson={lesson}
          hour={hour as HourOfDay}
          onChange={(ITempAppendSetting) => onChange(ITempAppendSetting)}
          key={`${day}${hour}`}
        ></TempLesson>
      ))}
    </div>
  )
}
