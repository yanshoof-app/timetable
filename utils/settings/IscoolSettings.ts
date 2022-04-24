import { IChangeIscool, ILessonIscool, ISCOOL } from '@yanshoof/iscool'
import { StudyGroupMapSettings } from '@yanshoof/settings'
import { IStudyGroup } from '@yanshoof/types'

/**
 * Represents settings of an iscool-based timetable
 * @author Itay Schechner
 * @version 1.0.0
 */
export class IscoolSettings extends StudyGroupMapSettings<ILessonIscool> {
  protected mapLessonToStudyGroup(lesson: ILessonIscool): IStudyGroup {
    return ISCOOL.toStudyGroup(lesson)
  }
}
