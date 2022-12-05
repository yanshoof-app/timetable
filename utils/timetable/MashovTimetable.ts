import { IMashovLesson, IMashovStudyGroup } from '@yanshoof/mashov'

export class MashovStudyGroups {
  private studyGroups: [string, string][] //[subject, teacher]
  private studyGroupMap: Map<string, number> //['day,hour', sgIndex]

  constructor(timetable: IMashovLesson[], studyGroups: IMashovStudyGroup[]) {
    this.studyGroups = []
    this.studyGroupMap = new Map<string, number>()
    for (let sg of studyGroups) {
      this.studyGroups.push([sg.subjectName, sg.groupTeachers.teacherName])
    }

    for (let lesson of timetable) {
      const subject = lesson.groupDetails.subjectName
      const teacher = lesson.groupDetails.groupTeachers[0].teacherName

      const day = lesson.timeTable.day
      const h = lesson.timeTable.lesson

      const indexOfSg = this.studyGroups.findIndex(
        ([s, t]) => s === subject && t === teacher
      )

      this.studyGroupMap.set(`${day},${h}`, indexOfSg)
    }
    return this
  }
}
