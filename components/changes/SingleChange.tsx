import { IChangeInfo } from '../../hooks/useChanges'
import useModification from '../../hooks/useModification'
import { LessonModification } from '../../interfaces'
import { TO } from '../timetable/ChangeList/Change'
import { changeTextColor } from '../timetable/Lesson'

export default function SingleChange(change: IChangeInfo) {
  const [color, typeOfChange] = useModification({
    modification: change.typeOfChange,
  })

  const isEvent = change.typeOfChange == LessonModification.Other

  return (
    <div className="flex gap-1">
      <div className="flex gap-[7px] truncate">
        {/* Type of change*/}
        {!isEvent && (
          <p className={`${changeTextColor(color)} font-bold`}>
            {typeOfChange}
          </p>
        )}

        {/* Change data */}
        {
          <p className="truncate font-medium dark:text-white">
            <span
              className={` ${
                isEvent ? 'dark:text-event-500' : 'dark:text-white'
              } ${isEvent && changeTextColor('event')}`}
            >
              {change.data}
            </span>
            {change.studyGroup && (
              <span className="dark:text-white truncate">
                {TO}
                {change.studyGroup}
              </span>
            )}
          </p>
        }
      </div>
    </div>
  )
}
