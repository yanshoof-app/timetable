import { ITeacherScheduleStatus } from '../../../hooks/useTeacherSchedule'
import { Done, Warning } from '../../icons'
import Spinner from './Spinner'

const LOADING_LESSONS = 'מחפש שיעורים'
const LESSONS_FOUND = 'שיעורים נמצאו'
const SEARCH_INTERRUPTED = 'חיפוש לא הושלם, נסו שנית מאוחר יותר'

function toPercent(number) {
  return Math.round(number * 100)
}

export default function SearchingLessons({
  lessonsFound,
  classesSearched,
  totalClasses,
  isLoading,
  error,
}: ITeacherScheduleStatus) {
  return (
    <div
      className={`flex px-4 gap-2 ${error ? 'items-start' : ' items-center'}`}
    >
      {isLoading ? (
        <Spinner className="h-4 w-4 fill-primary-500" />
      ) : error ? (
        <Warning width={24} height={24} className="fill-primary-500 mt-1" />
      ) : (
        <Done width={24} height={24} className="fill-primary-500" />
      )}
      <div className="dark:text-gray-300">
        <p className="font-semibold text-lg">
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
        {error && <span>{SEARCH_INTERRUPTED}</span>}
      </div>
    </div>
  )
}
