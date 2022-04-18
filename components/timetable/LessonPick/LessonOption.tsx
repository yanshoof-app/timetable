import { HourOfDay, IStudyGroup } from '../../../interfaces'

export interface LessonOptionProps {
  multipleHour: boolean
  option: IStudyGroup
  onPick(): unknown
}

export default function LessonOption({
  multipleHour,
  option,
  onPick,
}: LessonOptionProps) {
  return (
    <div
      className={`border-t-2 border-solid first:border-0 cursor-pointer truncate ${
        multipleHour ? 'pr-[52px]' : 'pr-[29px]'
      } border-uiPrimary-300 dark:border-gray-700 py-[4px] pt-2`}
      onClick={onPick}
    >
      {option.subject ? (
        <span className="font-bold ">{option.subject}</span>
      ) : (
        <span className="font-bold ">ללא שיעור</span>
      )}
      {option.teacher && (
        <span className="font-semibold text-gray-500 text-sm mr-2">
          {option.teacher}
        </span>
      )}
    </div>
  )
}
