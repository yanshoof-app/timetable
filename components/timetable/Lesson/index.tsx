import useModification from '../../../hooks/useModification'
import {
  HourOfDay,
  ILesson,
  isILessonObj,
  ITeacherLesson,
} from '../../../interfaces'
import { ColorMapper, ThemeColor } from '../../theme'
import ShadowedWrapper from '../../ui/ShadowedWrapper'
import ChangeList from '../ChangeList'
import LessonInfo from './LessonInfo'

export interface LessonProps {
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

export default function Lesson({ hour, lesson }: LessonProps) {
  const [color, modificationMessage] = useModification(lesson)
  return (
    <div className="flex flex-col">
      <ShadowedWrapper
        color={color}
        className="flex flex-row rounded-xl gap-[0.8rem] p-[0.8rem] items-center justify-start"
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
      {isILessonObj(lesson) && lesson.otherChanges && (
        <ChangeList {...lesson.otherChanges}></ChangeList>
      )}
    </div>
  )
}
