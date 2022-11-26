import { useState } from 'react'
import {
  DayOfWeek,
  DAYS_IN_WEEK,
  HourOfDay,
  HOURS_OF_DAY,
  IModification,
  ITeacherLesson,
} from '../interfaces'
import { initMatrix } from '../utils'
import useOperation from './useOperation'
import useTotalClasses from './useTotalClasses'

export interface ITeacherScheduleStatus {
  lessonsFound: number
  classesSearched: number
  totalClasses: number
  isLoading: boolean
  error: boolean
  delaying: boolean
}

export interface ITeacherSchedule extends ITeacherScheduleStatus {
  lessons: ITeacherLesson[][]
}

type LessonEvent = { day: DayOfWeek; hour: HourOfDay; lesson: ITeacherLesson }
type ChangeEvent = {
  day: DayOfWeek
  hour: HourOfDay
  modification: IModification
}

export default function useTeacherSchedule(
  teacherName: string
): ITeacherSchedule {
  const [lessons, setLessons] = useState(
    initMatrix<ITeacherLesson>(DAYS_IN_WEEK, HOURS_OF_DAY, {})
  )
  const [classesSearched, setClassesSearched] = useState(0)
  const [lessonsFound, setLessonsFound] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [delaying, setDelaying] = useState(false)
  const totalClasses = useTotalClasses()

  useOperation(
    '/api/timetable',
    {
      nextClass: () => {
        setClassesSearched((c) => ++c)
      },
      success: () => {
        setLoading(false)
      },
      error: () => {
        setLoading(false)
        setError(true)
      },
      delay: () => {
        setDelaying(true)
      },
      newLesson: ({ day, hour, lesson }: LessonEvent) => {
        console.log(day, hour)
        setLessonsFound((c) => ++c)
        setLessons((prev) => {
          const updatedTimetable = [...prev]
          updatedTimetable[day][hour] = lesson
          return updatedTimetable
        })
      },
      newChange: ({ day, hour, modification }: ChangeEvent) => {
        setLessons((prev) => {
          const updatedTimetable = [...prev]
          updatedTimetable[day][hour].changes ||= []
          updatedTimetable[day][hour].changes.push(modification)
          return updatedTimetable
        })
      },
    },
    { teacherName }
  )

  return {
    lessons,
    isLoading,
    error,
    delaying,
    lessonsFound,
    classesSearched,
    totalClasses,
  }
}