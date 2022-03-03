import { useMemo, useState } from 'react'
import FullTimetableProvider, {
  useFullTimetable,
} from '../../contexts/FullTimetable'
import { useStorage } from '../../contexts/Storage'
import { useLessonPicks } from '../../hooks/useLessonPicks'
import { isAnyLessonObj } from '../../interfaces'
import Timetable from './Timetable'

export default function TimetableInit() {
  const { timetable } = useFullTimetable()
  const { appendScheduleSetting } = useStorage()

  const pickableLessons = useLessonPicks(timetable)
  const [hourToShow, dayToShow] = useMemo(() => {
    return [1, 2]
  }, timetable)

  return (
    <FullTimetableProvider>
      <div>
        <Timetable
          day={dayToShow}
          timetable={timetable}
          onChange={(lesson, day, hour) => {
            isAnyLessonObj(lesson) &&
              appendScheduleSetting({
                day: day,
                hour: hour,
                subject: lesson.subject,
                teacher: lesson.teacher,
              })
          }}
        ></Timetable>
      </div>
    </FullTimetableProvider>
  )
}
