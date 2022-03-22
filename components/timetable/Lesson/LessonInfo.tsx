import InfoLine from './InfoLine'
import useLessonInfo from '../../../hooks/useLessonInfo'
import { ILesson, ITeacherLesson } from '../../../interfaces'
import { useMemo } from 'react'

export type ILessonInfoProps = Partial<ILesson>

export default function LessonInfo(info: ILessonInfoProps) {
  const { newTeacher, newRoom, newHour } = useLessonInfo(
    'changes' in info ? info.changes : []
  )
  if (!('subject' in info)) return <></>
  return (
    <div className={`flex flex-col gap-[0.7rem]`}>
      <InfoLine info={info.subject} newInfo={newHour} bold />
      {'teacher' in info && (
        <InfoLine info={info.teacher} newInfo={newTeacher} />
      )}
      {info.class && <InfoLine info={info.class} newInfo={newRoom} bold />}
    </div>
  )
}
