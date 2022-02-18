import { HourOfDay, ILesson } from '../../interfaces'

export interface LessonInfoProps {
  lesson: ILesson
  hour: HourOfDay
}

export default function LessonInfo({
  lesson = { class: '', subject: '', teacher: '' },
}: LessonInfoProps) {
  return <div className={`flex flex-col`}></div>
}
