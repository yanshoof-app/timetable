import { useMemo } from 'react'
import useModification from '../../../hooks/useModification'
import { IStudyGroupWithModification } from '../../../interfaces'
import { changeTextColor } from '../Lesson'

export const FROM = 'מ'
export const TO = 'ל'
export const IN = 'ב'
export const WITH = 'עם'
export const REPLACES = 'מחליף/ה את'

export default function Change(studyGroup: IStudyGroupWithModification) {
  const [color, modificationMessage] = useModification(studyGroup)
  const studyGroupName = useMemo(
    () => `${studyGroup.subject} ${WITH} ${studyGroup.teacher}`,
    [studyGroup]
  )

  return (
    <p className="truncate dark:text-gray-300">
      <span className={`${changeTextColor(color)} font-bold`}>
        {modificationMessage}
      </span>
      <span className="font-semibold dark:text-gray-300">
        {' '}
        {TO}
        {studyGroupName}
      </span>
    </p>
  )
}
