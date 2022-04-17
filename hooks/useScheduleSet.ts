import { useCallback } from 'react'
import { useStorage } from '../contexts/Storage'
import { useTimetable } from '../contexts/Timetable'
import { DayOfWeek, HourOfDay, ILesson } from '../interfaces'

export interface IAppendSetting {
  day: DayOfWeek
  hour: HourOfDay[]
  lesson: ILesson
}

export interface IScheduleSet {
  appendScheduleSetting(setting: IAppendSetting, isEditing?: boolean): void
  removeScheduleSetting(setting: IAppendSetting): void
}

export default function useScheduleSet(): IScheduleSet {
  const {
    setStudyGroups,
    setStudyGroupMap,
    setLastUserUpdate,
    setLessonMatrix,
    studyGroups,
  } = useStorage()
  const { setProblems } = useTimetable()

  const applyLessons = useCallback(
    (
      day: DayOfWeek,
      hours: HourOfDay[],
      lesson: ILesson,
      isEditing: boolean,
      indexOfSg: number
    ) => {
      setStudyGroupMap((prev) => {
        for (let h of hours) prev.set(`${day},${h}`, indexOfSg)
        return prev
      })
      if (!isEditing) {
        setProblems((prev) =>
          prev.filter(([d, h]) => d != day || hours.every((hour) => hour != h))
        )
      }
      setLessonMatrix((prev) => {
        let lessons = [...prev]
        for (let h of hours) lessons[day][h] = lesson
        return lessons
      })
      setLastUserUpdate(undefined)
    },
    [setStudyGroupMap, setLessonMatrix, setLastUserUpdate, setProblems]
  )

  const appendScheduleSetting = useCallback(
    ({ day, hour, lesson }: IAppendSetting, isEditing = false) => {
      if (!lesson.subject && !lesson.teacher) {
        // window
        applyLessons(day, hour, {} as ILesson, isEditing, -1)
        return
      }
      let indexOfSg = studyGroups.findIndex(
        ([s, t]) => s === lesson.subject && t === lesson.teacher
      )
      if (indexOfSg == -1) {
        indexOfSg = studyGroups.length
        setStudyGroups((prev) => [...prev, [lesson.subject, lesson.teacher]])
      }
      applyLessons(day, hour, lesson, isEditing, indexOfSg)
    },
    [applyLessons, studyGroups, setStudyGroups]
  )

  const removeScheduleSetting = useCallback(
    ({ day, hour, lesson: lesson }: IAppendSetting) => {
      setStudyGroupMap((prev) => {
        prev.delete(`${day},${hour}`)
        return prev
      })
      setLessonMatrix((prev) => {
        let lessons = [...prev]
        for (let h of hour) lessons[day][h] = lesson
        return lessons
      })
    },
    [setLessonMatrix, setStudyGroupMap]
  )

  return { appendScheduleSetting, removeScheduleSetting }
}
