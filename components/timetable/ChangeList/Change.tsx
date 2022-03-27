import { useMemo } from 'react'
import useLessonInfo from '../../../hooks/useLessonInfo'
import useModification from '../../../hooks/useModification'
import { IStudyGroupWithModification } from '../../../interfaces'
import { changeTextColor } from '../Lesson'

const TO = 'ל'
const WITH = 'עם'

export default function Change(studyGroup: IStudyGroupWithModification) {
  const [color, modificationMessage] = useModification(studyGroup)
  const studyGroupName = useMemo(
    () => `${studyGroup.subject} ${WITH} ${studyGroup.teacher}`,
    [studyGroup]
  )

  return (
    <p className=" truncate">
      <span className={`${changeTextColor(color)} font-bold`}>
        {modificationMessage}
      </span>
      <span className="font-semibold">
        {' '}
        {TO}
        {studyGroupName}
      </span>
    </p>
  )
}
