import { useCallback, useMemo, useState } from 'react'
import { useFullTimetable } from '../../contexts/FullTimetable'
import { useStorage } from '../../contexts/Storage'
import useHebrewDate, { HEBREW_DAYS } from '../../hooks/useHebrewDate'
import { useIteration } from '../../hooks/useIteration'
import { useLessonPicks } from '../../hooks/useLessonPicks'
import { DayOfWeek, HourOfDay, isAnyLessonObj } from '../../interfaces'
import Button from '../forms/Button'
import LoadingTimetable from './Skeleton/TimetableSkeleton'
import Timetable, { SupportedLesson } from './Timetable'

export default function TimetableInit() {
  const { timetable } = useFullTimetable()
  const { appendScheduleSetting } = useStorage()
  const pickableLessons = useLessonPicks(timetable)
  const { day, hour, ...gestures } = useIteration(pickableLessons)

  const handleLessonChange = useCallback(
    (lesson: SupportedLesson, day: DayOfWeek, hour: HourOfDay) => {
      console.log(lesson, day, hour)
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
    <div className="p-[18px] h-screen flex flex-col justify-between items-center gap-2 ">
      <p className="font-bold text-2xl">הוסיפו שיעורים במקומות הריקים</p>
      <p className="font-semibold text-xl">{HEBREW_DAYS[day]}</p>
      <div
        className={`bg-stone-200 p-[18px] rounded-[30px] w-full h-full ${
          timetable.length ? 'overflow-scroll' : 'overflow-hidden'
        }`}
      >
        {timetable.length ? (
          <Timetable
            day={day}
            timetable={timetable}
            hourToScroll={hour}
            onChange={handleLessonChange}
          ></Timetable>
        ) : (
          <LoadingTimetable></LoadingTimetable>
        )}
      </div>
      <div className="flex justify-between w-full p-0">
        <Button
          disabled={gestures.prevDisabled}
          onClick={gestures.prev}
          className="mx-0 w-24"
        >
          הקודם
        </Button>
        <Button
          disabled={gestures.nextDisabled}
          onClick={gestures.next}
          className="mx-0 w-24"
        >
          הבא
        </Button>
      </div>
    </div>
  )
}
