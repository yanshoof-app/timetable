import { useCallback, useMemo, useState } from 'react'
import { useFullTimetable } from '../../contexts/FullTimetable'
import { useStorage } from '../../contexts/Storage'
import { useIteration } from '../../hooks/useIteration'
import { useLessonPicks } from '../../hooks/useLessonPicks'
import { DayOfWeek, HourOfDay, isAnyLessonObj } from '../../interfaces'
import Button from '../forms/Button'
import Timetable, { SupportedLesson } from './Timetable'

export default function TimetableInit() {
  const { timetable } = useFullTimetable()
  const { appendScheduleSetting } = useStorage()
  const pickableLessons = useLessonPicks(timetable)
  const { day, hour, ...gestures } = useIteration(pickableLessons)
  console.log(timetable)

  const handleLessonChange = useCallback(
    (lesson: SupportedLesson, day: DayOfWeek, hour: HourOfDay) => {
      isAnyLessonObj(lesson) &&
        appendScheduleSetting({
          day: day,
          hour: hour,
          subject: lesson.subject,
          teacher: lesson.teacher,
        })
    },
    [appendScheduleSetting]
  )

  return (
    <div>
      {timetable.length && (
        <Timetable
          day={day}
          timetable={timetable}
          hourToScroll={hour}
          onChange={handleLessonChange}
        ></Timetable>
      )}
      <div className="flex">
        <Button disabled={gestures.nextDisabled} onClick={gestures.next}>
          הבא
        </Button>
        <Button disabled={gestures.prevDisabled} onClick={gestures.prev}>
          הקודם
        </Button>
      </div>
    </div>
  )
}
