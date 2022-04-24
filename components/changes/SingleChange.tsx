import { IChangeInfo } from '../../hooks/useChanges'
import useModification from '../../hooks/useModification'
import { LessonModification } from '../../interfaces'
import { changeTextColor } from '../timetable/Lesson'

export default function SingleChange(change: IChangeInfo) {
  const [color, typeOfChange] = useModification({
    modification: change.typeOfChange,
  })

  const isEvent = change.typeOfChange == LessonModification.Other

  return (
    <div className="flex gap-1">
      <div className="flex gap-[7px]">
        {/* Type of change*/}
        {!isEvent && (
          <p className={`${changeTextColor(color)} font-bold`}>
            {typeOfChange}
          </p>
        )}

        {/* Change data */}
        {
          <p
            className={`font-medium ${
              isEvent ? 'dark:text-event-500' : 'dark:text-white'
            } ${isEvent && changeTextColor('event')}`}
          >
            {change.data}
          </p>
        }
      </div>
    </div>
  )
}
