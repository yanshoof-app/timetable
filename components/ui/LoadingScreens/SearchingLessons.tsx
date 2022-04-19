import { ITeacherScheduleStatus } from '../../../hooks/useTeacherSchedule'
import { Done } from '../../icons'
import Spinner from './Spinner'

const LOADING_LESSONS = 'מחפש שיעורים'
const LESSONS_FOUND = 'שיעורים נמצאו'

function toPercent(number) {
  return Math.round(number * 100)
}

export default function SearchingLessons({
  lessonsFound,
  classesSearched,
  totalClasses,
  isLoading,
}: ITeacherScheduleStatus) {
  return (
    <div className="flex px-4 items-center gap-2">
      {isLoading ? (
        <Spinner className="h-4 w-4 fill-primary-500" />
      ) : (
        <Done width={24} height={24} className="fill-primary-500" />
      )}
      <p className="dark:text-gray-300 font-semibold text-lg">
        {isLoading ? (
          <>
            <span>{LOADING_LESSONS}</span>
            <span> ({toPercent(classesSearched / totalClasses)}%)</span>
          </>
        ) : (
          <span>
            {lessonsFound} {LESSONS_FOUND}
          </span>
        )}
      </p>
    </div>
  )
}
