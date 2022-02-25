import { useEffect, useState } from 'react'
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
import LessonOption from './LessonOption'

export interface LessonPickProps {
  options: IStudyGroup[]
  defaultLesson?: ILesson | IStudyGroup
  hour: HourOfDay | string
  onChange?(picked): unknown
}

export default function LessonPick({
  options,
  defaultLesson,
  hour,
  onChange,
}: LessonPickProps) {
  const [isOpen, setOpen] = useState(false)
  const [picked, setPicked] = useState({ index: 0, studyGroup: defaultLesson })

  useEffect(() => {
    onChange(picked.index)
    setOpen(false)
  }, [picked])
  return (
    <ShadowedWrapper
      color={picked.studyGroup.subject ? 'gray' : 'primary'}
      className="flex flex-col rounded-[12px] p-[0.8rem] gap-3 pl-0 pr-0 justify-end"
    >
      <div className="flex flex-row rounded-[12px] gap-[0.8rem] p-[0.8rem] pb-1 pl-0 items-center">
        <p className="font-hour font-bold text-[24px] text-gray-500">{hour}</p>
        <div
          className="flex flex-row items-center justify-between pl-[0.8rem] gap-[0.7rem] grow-[1]"
          onClick={() => setOpen(!isOpen)}
        >
          {picked.studyGroup.subject ? (
            <LessonInfo
              {...{
                subject: picked.studyGroup.subject,
                teacher: picked.studyGroup.teacher,
              }}
            />
          ) : (
            <p className="font-semibold text-uiPrimary-400 text-lg">
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
          {picked.studyGroup.subject && (
            <LessonOption
              multipleHour={typeof hour === 'string'}
              option={{ subject: null, teacher: null }}
              index={-1}
              setPicked={setPicked}
            ></LessonOption>
          )}
          {options.map(
            (option, index) =>
              picked.studyGroup !== option && (
                <LessonOption
                  key={index}
                  multipleHour={typeof hour === 'string'}
                  option={option}
                  index={index}
                  setPicked={setPicked}
                ></LessonOption>
              )
          )}
        </div>
      )}
    </ShadowedWrapper>
  )
}
