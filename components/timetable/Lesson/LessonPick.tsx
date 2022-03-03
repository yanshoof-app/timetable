import { useEffect, useRef, useState } from 'react'
import { useDidUpdateEffect } from '../../../hooks/useUpdateEffect'
import { HourOfDay, ILesson, IStudyGroup } from '../../../interfaces'
import { Expand } from '../../icons'
import ShadowedWrapper from '../../ui/ShadowedWrapper'
import LessonInfo from './LessonInfo'
import LessonOption from './LessonOption'

export interface LessonPickProps {
  options: IStudyGroup[]
  defaultLesson?: ILesson | IStudyGroup
  hour: HourOfDay | string
  onChange?(picked: number): unknown
}

export default function LessonPick({
  options,
  defaultLesson,
  hour,
  onChange,
}: LessonPickProps) {
  const [isOpen, setOpen] = useState(false)
  const [picked, setPicked] = useState({ index: 0, studyGroup: defaultLesson })

  const [height, setHeight] = useState()

  useDidUpdateEffect(() => {
    onChange(picked.index)
    setOpen(false)
  }, [picked])
  const child = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    isOpen
      ? (container.current.style.maxHeight = child.current.offsetHeight + 'px')
      : (container.current.style.maxHeight = '')
  }, [isOpen])

  return (
    <ShadowedWrapper
      color={picked.studyGroup.subject ? 'gray' : 'primary'}
      className={`flex flex-col rounded-[12px] p-[0.8rem] transition-all duration-[0s] ease-in-out ${
        isOpen ? 'gap-3' : 'gap-0 delay-100 transition-all duration-100'
      } pl-0 pr-0 justify-end`}
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
      <div
        ref={container}
        className={`flex flex-col flex-nowrap gap-1 transition-all duration-200 ease-in-out ${
          typeof hour === 'string' ? 'mr-[0rem]' : 'mr-[0rem]'
        } max-h-0 overflow-hidden`}
      >
        <div
          ref={child}
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
      </div>
    </ShadowedWrapper>
  )
}
