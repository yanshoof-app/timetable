import ShadowedWrapper from '../ui/ShadowedWrapper'
import { SkeletonLesson } from './Lesson/Skeleton'

const timetable = [true, true, true, true, true, true, true, true, true]

export default function LoadingTimetable() {
  return (
    <div className={`flex flex-col gap-[1rem]`}>
      {timetable.map((lesson, index) => (
        <SkeletonLesson key={index} />
      ))}
    </div>
  )
}