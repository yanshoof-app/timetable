import { useCallback } from 'react'
import { IAppendSetting } from '../../../../contexts/Storage/types'

const _appendScheduleSettings = (
  studyGroups,
  setStudyGroups,
  setStudyGroupMap,
  lesson: IAppendSetting
) => {
  const { day, hour, subject, teacher } = lesson
  let indexOfSg = Array(studyGroups).findIndex(
    ([s, t]) => s === subject && t === teacher
  )
  if (indexOfSg == -1) {
    indexOfSg = studyGroups.length
    setStudyGroups((prev) => [...prev, [subject, teacher]])
  }
  setStudyGroupMap((prev) => new Map(prev.set(`${day},${hour}`, indexOfSg)))
}

export default _appendScheduleSettings
