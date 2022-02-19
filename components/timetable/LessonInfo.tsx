import InfoLine from './InfoLine'

export interface LessonInfoProps {
  subject: string
  newSubject?: string
  teacher: string
  newTeacher?: string
  room?: string
  newRoom?: string
  canceled?: boolean
}

export default function LessonInfo({
  subject = '',
  newSubject = '',
  teacher = '',
  newTeacher = '',
  room = '',
  newRoom = '',
  canceled = false,
}: LessonInfoProps) {
  return (
    <div className={`flex flex-col gap-[0.7rem]`}>
      <InfoLine
        info={subject}
        newInfo={newSubject}
        bold={true}
        canceled={canceled}
      />
      <InfoLine info={teacher} newInfo={newTeacher} />
      {room && (
        <InfoLine
          info={room}
          newInfo={newRoom}
          bold={true}
          canceled={canceled}
        />
      )}
    </div>
  )
}
