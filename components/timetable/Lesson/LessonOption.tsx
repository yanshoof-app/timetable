import { HourOfDay, IStudyGroup } from '../../../interfaces'

export interface LessonOptionProps {
  multipleHour: boolean
  option: IStudyGroup
  index: number
  setPicked({ index: number, studyGroup: IStudyGroup }): unknown
}

export default function LessonOption({
  multipleHour,
  option,
  index,
  setPicked,
}: LessonOptionProps) {
  return (
    <span
      className={`border-t-2 border-solid first:border-0 cursor-pointer ${
        multipleHour ? 'pr-[52px]' : 'pr-[29px]'
      } border-uiPrimary-300 py-[4px] pt-2`}
      onClick={() => setPicked({ index: index, studyGroup: option })}
    >
      <a className="font-bold ">{option.subject}</a>
      {option.teacher && (
        <a className="font-semibold text-gray-500 text-sm mr-2">
          {option.teacher}
        </a>
      )}
    </span>
  )
}
