import useModification from '../../hooks/useModification'
import { HourOfDay, ILesson } from '../../interfaces'
import ShadowedWrapper from '../ui/ShadowedWrapper'
import LessonInfo from './LessonInfo'

export interface LessonInfoProps extends ILesson {
  hour: HourOfDay
}

export default function Lesson(lesson: LessonInfoProps) {
  const [color, modificationMessage] = useModification(lesson)
  return (
    <ShadowedWrapper
      color={color}
      className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] items-center justify-start"
    >
      <p className="font-hour font-bold text-[24px] text-gray-500">
        {lesson.hour}
      </p>
      <div className="flex flex-col gap-[0.7rem]">
        <LessonInfo {...lesson} />
        <p
          className={` mb-[-0.46rem] mt-[-0.46rem] font-bold text-${color}-500`}
        >
          {modificationMessage}
        </p>
      </div>
    </ShadowedWrapper>
  )
}
