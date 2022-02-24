import useModification from '../../../hooks/useModification'
import { HourOfDay, ILesson, ITeacherLesson } from '../../../interfaces'
import { ColorMapper, ThemeColor } from '../../theme'
import ShadowedWrapper from '../../ui/ShadowedWrapper'
import LessonInfo from './LessonInfo'

export interface LessonInfoProps {
  hour: HourOfDay
  lesson: ILesson | ITeacherLesson | {}
}

export const changeTextColor: ColorMapper = (color: ThemeColor) =>
  ({
    event: 'text-event-600',
    change: 'text-change-500',
    celebration: 'text-celebration-500',
    primary: 'text-primary-500',
    gray: 'text-gray-900',
  }[color])

export default function Lesson({ hour, lesson }: LessonInfoProps) {
  const [color, modificationMessage] = useModification(lesson)
  return (
    <ShadowedWrapper
      color={color}
      className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] items-center justify-start"
    >
      <p className="font-hour font-bold text-[24px] text-gray-500">{hour}</p>
      <div className="flex flex-col gap-[0.7rem]">
        <LessonInfo {...lesson} />
        <p
          className={` mb-[-0.46rem] mt-[-0.46rem] font-bold ${changeTextColor(
            color
          )}`}
        >
          {modificationMessage}
        </p>
      </div>
    </ShadowedWrapper>
  )
}
