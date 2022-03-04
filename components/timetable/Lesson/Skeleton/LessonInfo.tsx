import { SkeletonInfoLine } from './InfoLine'

export function SkeletonLessonInfo() {
  return (
    <div className={`flex flex-col gap-[0.7rem]`}>
      <SkeletonInfoLine className="w-44" />
      <SkeletonInfoLine className="w-28" />
      <SkeletonInfoLine className="w-14" />
    </div>
  )
}
