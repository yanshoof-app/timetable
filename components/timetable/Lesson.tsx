import { HourOfDay, ILesson, LessonModification } from '../../interfaces'
import ShadowedWrapper from '../ui/ShadowedWrapper'
import LessonInfo from './LessonInfo'

const ModToColor = (modification: LessonModification) => {
  switch (modification) {
    case 1:
      return 'green'
    case 2:
      return 'red'
    case 3:
      return 'orange'
    case 4:
      return 'orange'
    case 5:
      return 'orange'
    default:
      break
  }
}

const colorOptions = {
  red: 'rose-600',
  orange: 'amber-500',
  green: 'lime-500',
  primary: 'sky-500',
  default: 'gray-500',
}

export interface LessonInfoProps {
  info: ILesson
  hour: HourOfDay
}

export default function Lesson({
  info = {
    class: '',
    subject: '',
    teacher: '',
    modification: 0,
  },
  hour = 0,
}: LessonInfoProps) {
  return (
    <ShadowedWrapper
      color={ModToColor(info.modification)}
      className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] items-center"
    >
      <p className="font-hour font-bold text-[24px] text-gray-500">{hour}</p>
      <div className="flex flex-col gap-[0.7rem]">
        <LessonInfo
          subject={info.subject}
          teacher={info.teacher}
          room={info.class}
          newSubject={''}
          newTeacher={''}
          newRoom={'ח מחשבים'}
        />
        <p
          className={` mb-[-0.46rem] mt-[-0.46rem] font-bold text-${
            colorOptions[ModToColor(info.modification)]
          }`}
        >
          {
            {
              1: 'שיעור חופשי',
              2: 'מבחן',
              3: 'החלפת מורה',
              4: 'מעבר חדר',
            }[info.modification]
          }
        </p>
      </div>
    </ShadowedWrapper>
  )
}
