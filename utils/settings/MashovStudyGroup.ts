import {
  fetchDataSource,
  ILessonArrMemberIscool,
  ILessonIscool,
  ISCOOL,
} from '@yanshoof/iscool'
import { IMashovLesson, IMashovStudyGroup } from '@yanshoof/mashov'
import { ProblemArray, Settings } from '@yanshoof/settings'
import { DayOfWeek, HourOfDay, IStudyGroup } from '@yanshoof/types'
import { ServerTimetable } from '..'
import StudyGroup from '../../temp/settings/studyGroup/[groupId]'
import { IscoolSettings } from './IscoolSettings'

export class MashovStudyGroupImporter {
  private studyGroups: [string, string][] //[subject, teacher]
  private studyGroupMap: Map<string, number> //['day,hour', sgIndex]

  constructor(timetable: IMashovLesson[], studyGroups: IMashovStudyGroup[]) {
    this.studyGroups = []
    this.studyGroupMap = new Map<string, number>()

    for (let sg of studyGroups) {
      this.studyGroups.push([sg.subjectName, sg.groupTeachers[0].teacherName])
    }
    for (let lesson of timetable) {
      const subject = lesson.groupDetails.subjectName
      const teacher = lesson.groupDetails.groupTeachers[0].teacherName

      const day = lesson.timeTable.day - 1
      const h = lesson.timeTable.lesson

      const indexOfSg = this.studyGroups.findIndex(
        ([s, t]) => s === subject && t === teacher
      )

      this.studyGroupMap.set(`${day},${h}`, indexOfSg)
    }
    return this
  }

  private selectLesson(day: number, hour: number): [string, string] {
    return this.studyGroups[this.studyGroupMap.get(`${day},${hour}`)]
  }

  public fromSchedule(schedule: ILessonArrMemberIscool[]) {
    const studyGroups: [string, string][] = []
    const studyGroupMap: Map<string, number> = new Map<string, number>()

    for (let lesson of schedule) {
      const day = lesson.Day
      const hour = lesson.Hour
      const hourlyLessons = lesson.Lessons

      const selectedLesson = this.selectLesson(day, hour)
      if (selectedLesson && hourlyLessons.length > 1)
        for (let l of hourlyLessons) {
          if (l.Teacher === selectedLesson[1]) {
            let indexOfSg = studyGroups.findIndex(
              ([s, t]) => s === l.Subject && t === l.Teacher
            )
            if (indexOfSg == -1) {
              indexOfSg = studyGroups.length
              studyGroups.push([l.Subject, l.Teacher])
            }

            studyGroupMap.set(`${day},${hour}`, indexOfSg)
          }
        }
    }

    return {
      studyGroups,
      studyGroupMap,
    }
  }
}

