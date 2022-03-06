import { useMemo } from 'react'
import useLessonInfo from '../../../hooks/useLessonInfo'
import useModification from '../../../hooks/useModification'
import { IStudyGroupWithModification } from '../../../interfaces'
import { changeTextColor } from '../Lesson'

const TO = 'ל'
const WITH = 'עם'

export default function Change(studyGroup: IStudyGroupWithModification) {
  const { newTeacher, newRoom, newHour } = useLessonInfo([studyGroup])
  const [color, modificationMessage] = useModification(studyGroup)
  const studyGroupName = useMemo(
    () => `${studyGroup.subject} ${WITH} ${studyGroup.teacher}`,
    [studyGroup]
  )

  return (
    <p>
      <span className={`${changeTextColor(color)} font-bold`}>
        {modificationMessage}
      </span>
      <span>
        {' '}
        {TO}
        {studyGroupName}
      </span>
    </p>
  )
}
