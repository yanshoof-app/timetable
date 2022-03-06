import InfoLine from './InfoLine'
import useLessonInfo from '../../../hooks/timetable/useLessonInfo'

export default function LessonInfo(info) {
  const { newTeacher, newRoom, newHour } = useLessonInfo([info])
  return (
    <div className={`flex flex-col gap-[0.7rem]`}>
      <InfoLine info={info.subject} newInfo={newHour} bold />
      {info.teacher && <InfoLine info={info.teacher} newInfo={newTeacher} />}
      {info.class && <InfoLine info={info.class} newInfo={newRoom} bold />}
    </div>
  )
}
