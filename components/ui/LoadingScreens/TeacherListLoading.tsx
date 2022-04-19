import Spinner from './Spinner'

export interface ITeacherListLoadingProps {
  isLoading: boolean
  searchQuery: string
  showMore: Function
  classesSearched: number
  totalClasses: number
}

const SEARCH_ENTIRE_SCHOOL = 'חפש מורים אחרים בבית הספר'
const LOADING_TEACHERS = 'מחפש מורים'

function toPercent(number) {
  return Math.round(number * 100)
}

export default function TeacherListLoading({
  isLoading,
  searchQuery,
  showMore,
  classesSearched,
  totalClasses,
}: ITeacherListLoadingProps) {
  return isLoading ? (
    <div className="flex px-4 items-center gap-2 dark:text-gray-300 justify-center">
      <Spinner className="h-4 w-4 fill-primary-500" />
      <span>{LOADING_TEACHERS}</span>
      <span> ({toPercent(classesSearched / totalClasses)}%)</span>
    </div>
  ) : (
    searchQuery && !classesSearched && (
      <button
        className="text-primary-500 font-semibold cursor-pointer"
        onClick={() => showMore()}
      >
        {SEARCH_ENTIRE_SCHOOL}
      </button>
    )
  )
}
