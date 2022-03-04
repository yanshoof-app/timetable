import ShadowedWrapper from '../../../ui/ShadowedWrapper'
import { SkeletonLessonInfo } from './LessonInfo'

export function SkeletonLesson() {
  return (
    <ShadowedWrapper
      color={'gray'}
      className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] items-center justify-start animate-pulse"
    >
      <p className="h-6 w-5 bg-gray-400"></p>
      <SkeletonLessonInfo />
    </ShadowedWrapper>
  )
}
