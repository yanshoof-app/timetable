import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFullTimetable } from '../../../contexts/FullTimetable'
import { useStorage } from '../../../contexts/Storage'
import { useTimetable } from '../../../contexts/Timetable'
import { useDidUpdateEffect } from '../../../hooks/useUpdateEffect'
import { DayOfWeek, HourOfDay, ILesson } from '../../../interfaces'
import { Expand } from '../../icons'
import ShadowedWrapper from '../../ui/ShadowedWrapper'
import LessonInfo from '../Lesson/LessonInfo'
import LessonOption from './LessonOption'

export interface LessonPickProps {
  hour: HourOfDay | HourOfDay[]
  day: DayOfWeek
  editable?: boolean
}

export default function LessonPick({
  hour,
  day,
  editable = false,
}: LessonPickProps) {
  const [isOpen, setOpen] = useState(false)
  const { studyGroupMap, setLastUserUpdate } = useStorage()
  const { lessons, appendScheduleSetting, removeScheduleSetting, problems } =
    useTimetable()
  const { timetable } = useFullTimetable()
  const isMultipleHour = useMemo(() => !(typeof hour == 'number'), [hour])
  const displayHour = useMemo<HourOfDay>(
    () => (isMultipleHour ? hour[0] : hour),
    [hour, isMultipleHour]
  )
  const problemInHour = useMemo(
    () => problems && problems.some(([d, h]) => d == day && h == displayHour),
    [problems, day, hour]
  )
  const isWindow = studyGroupMap.get(`${day},${displayHour}`) == -1

  useDidUpdateEffect(() => {
    setOpen(false)
  }, [studyGroupMap])

  const ref = useRef(null)
  const container = useRef(null) //animated study groups options
  const child = useRef(null) //study groups options flex box

  useEffect(() => {
    isOpen
      ? (container.current.style.maxHeight = child.current.offsetHeight + 'px')
      : (container.current.style.maxHeight = '')
  }, [isOpen])

  const applyLessonPick = useCallback(
    (lesson: ILesson) => {
      const now = new Date()
      const sunday = new Date(now.setDate(now.getDate() - now.getDay())) //Sunday of this week
      setLastUserUpdate(sunday)

      if (isMultipleHour) {
        for (let currentHour of hour as HourOfDay[]) {
          appendScheduleSetting({ lesson, day, hour: currentHour }, editable)
        }
      } else {
        // single hour
        if (studyGroupMap.get(`${day},${hour}`) == -1)
          // was window
          removeScheduleSetting({ lesson, day: day, hour: hour as HourOfDay })
        else
          appendScheduleSetting(
            { lesson, day, hour: hour as HourOfDay },
            editable
          )
      }
    },
    [appendScheduleSetting, isMultipleHour, day, hour, editable]
  )

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isOpen &&
        ref.current &&
        !(ref.current as HTMLElement).contains(e.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isOpen])

  return (
    <ShadowedWrapper
      color={problemInHour ? 'primary' : 'gray'}
      className={`flex flex-col rounded-xl py-[0.8rem] transition-all duration-[0s] ease-in-out ${
        isOpen ? 'gap-3' : 'gap-0 delay-100 transition-all duration-100'
      } justify-end`}
    >
      <div
        className="flex flex-row rounded-xl gap-[0.8rem] p-[0.8rem] py-1 pl-0 items-center cursor-pointer"
        ref={ref}
      >
        <p className="font-hour font-bold text-[24px] text-gray-500">
          {isMultipleHour && (hour as HourOfDay[]).length
            ? (hour as HourOfDay[]).join('-')
            : displayHour}
        </p>
        <div
          className="flex flex-row items-center justify-between pl-[0.8rem] gap-[0.7rem] grow-[1]"
          onClick={() => setOpen(!isOpen)}
        >
          {(!problemInHour || editable) && !isWindow ? (
            <LessonInfo
              {...{
                subject: lessons[day][displayHour].subject,
                teacher: lessons[day][displayHour].teacher,
                class: lessons[day][displayHour].class,
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
          isMultipleHour ? 'mr-[0rem]' : 'mr-[0rem]'
        } max-h-0 overflow-hidden`}
      >
        <div
          ref={child}
          className={`flex flex-col flex-nowrap gap-1  ${
            isMultipleHour ? 'mr-[0rem]' : 'mr-[0rem]'
          } `}
        >
          {/* Window option */}
          {!isWindow && (
            <LessonOption
              multipleHour={isMultipleHour}
              option={{ subject: null, teacher: null }}
              onPick={() => applyLessonPick({} as ILesson)}
            />
          )}
          {/* Available options */}
          {timetable[day][displayHour].map((option, index) => (
            <LessonOption
              key={index}
              multipleHour={isMultipleHour}
              option={option}
              onPick={() => applyLessonPick(option)}
            />
          ))}
        </div>
      </div>
    </ShadowedWrapper>
  )
}
