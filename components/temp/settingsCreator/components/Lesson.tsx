import { useEffect, useState } from 'react'
import { DayOfWeek, HourOfDay, IStudyGroup } from '../../../../interfaces'
import { isArray } from '../../../../utils/data/arrays'
import { Expand } from '../../../icons'
import LessonRadioButton from './RadioButton'
import TempStudyGroup from './StudyGroup'
import { ITempAppendSetting } from './Timetable'

export interface TempLessonProps {
  day: DayOfWeek
  hour: HourOfDay
  lesson: IStudyGroup[]
  onChange(info: ITempAppendSetting): unknown
}

export default function TempLesson({
  day,
  hour,
  lesson,
  onChange,
}: TempLessonProps) {
  const [selected, setSelected] = useState(0)

  const [opened, setOpened] = useState(false)
  const isMultiLesson = lesson.length > 1

  useEffect(() => {
    isMultiLesson &&
      onChange({
        day: day as DayOfWeek,
        hour: hour as HourOfDay,
        subject: isArray(lesson) ? lesson[selected].subject : '',
        teacher: isArray(lesson) ? lesson[selected].teacher : '',
        studyGroups: lesson,
      })
  }, [selected])

  return (
    isArray(lesson) && (
      <div className="flex flex-col justify-start">
        <div
          className={`flex flex-row justify-between ${
            isMultiLesson && 'cursor-pointer'
          }`}
          onClick={() => setOpened(!opened)}
        >
          <div className="flex gap-3 items-center">
            <p className="font-bold text-3xl">{hour}</p>
            <TempStudyGroup {...lesson[selected]} />
          </div>
          {isMultiLesson && (
            <Expand width={24} className={`${opened && 'rotate-180'}`} />
          )}
        </div>
        {opened && (
          <div className="pr-5">
            {isMultiLesson &&
              lesson.map((studyGroup, index) => (
                <LessonRadioButton
                  selected={selected === index}
                  key={index}
                  onClick={() => setSelected(index)}
                >
                  <TempStudyGroup {...studyGroup} />
                </LessonRadioButton>
              ))}
          </div>
        )}
      </div>
    )
  )
}
