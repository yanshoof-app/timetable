import { DayOfWeek, HourOfDay, LessonModification } from '../../interfaces'

export interface ChangeInfo {
  day: DayOfWeek
  hour: HourOfDay
  studyGroup?: string
  typeOfChange: LessonModification
  change?: string
}

export default function Change(change: ChangeInfo) {
  return (
    <div>
      {change.typeOfChange == LessonModification.Canceled && <p>{change[1]}</p>}
    </div>
  )
}
