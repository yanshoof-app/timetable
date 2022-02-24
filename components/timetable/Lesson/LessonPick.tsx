import { useState } from 'react'
import useModification from '../../../hooks/useModification'
import {
  HourOfDay,
  ILesson,
  IStudyGroup,
  ITeacherLesson,
} from '../../../interfaces'
import { Expand } from '../../icons'
import { ColorMapper, ThemeColor } from '../../theme'
import ShadowedWrapper from '../../ui/ShadowedWrapper'
import LessonInfo from './LessonInfo'

export interface LessonPickProps {
  options: IStudyGroup[]
  defaultLesson?: ILesson | IStudyGroup
  hour: HourOfDay | string
  onChange?(): unknown
}

export default function LessonPick({
  options,
  defaultLesson,
  hour,
  onChange,
}: LessonPickProps) {
  const [isOpen, setOpen] = useState(false)
  const [picked, setPicked] = useState(defaultLesson)
  return (
    <ShadowedWrapper
      color={picked ? 'gray' : 'primary'}
      className="flex flex-col rounded-[12px] p-[0.8rem] gap-3 pl-0 pr-0 justify-end"
    >
      <div className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] pb-1 pl-0 items-center">
        <p className="font-hour font-bold text-[24px] text-gray-500">{hour}</p>
        <div
          className="flex flex-row items-center justify-between pl-[0.8rem] gap-[0.7rem] grow-[1]"
          onClick={() => setOpen(!isOpen)}
        >
          {picked ? (
            <LessonInfo
              {...{ subject: picked.subject, teacher: picked.teacher }}
            />
          ) : (
            <p
              className="font-semibold text-uiPrimary-400 text-lg"
              onClick={() => setOpen(!isOpen)}
            >
              ללא שיעור
            </p>
          )}
          <button>
            <Expand
              className={`${isOpen && 'rotate-180'}`}
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className={`flex flex-col flex-nowrap gap-1  ${
            typeof hour === 'string' ? 'mr-[0rem]' : 'mr-[0rem]'
          } `}
        >
          {picked && (
            <span
              className={`border-t-2 border-solid first:border-0 w-full cursor-pointer ${
                typeof hour === 'string' ? 'pr-[52px]' : 'pr-[29px]'
              } border-uiPrimary-300 py-[4px] pt-2`}
              onClick={() => setPicked(null)}
            >
              <a className="font-bold ">ללא שיעור</a>
            </span>
          )}
          {options.map(
            (option, index) =>
              picked !== option && (
                <span
                  className={`border-t-2 border-solid first:border-0 cursor-pointer ${
                    typeof hour === 'string' ? 'pr-[52px]' : 'pr-[29px]'
                  } border-uiPrimary-300 py-[4px] pt-2`}
                  onClick={() => setPicked(option)}
                >
                  <a className="font-bold ">{option.subject}</a>
                  <a className="font-semibold text-gray-500 text-sm mr-2">
                    {option.teacher}
                  </a>
                </span>
              )
          )}
        </div>
      )}
    </ShadowedWrapper>
  )
}
