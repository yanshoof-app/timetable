import { ChangeInfo } from '../../hooks/useChanges'
import useModification from '../../hooks/useModification'
import { DayOfWeek, HourOfDay, LessonModification } from '../../interfaces'
import { changeTextColor } from '../timetable/Lesson'

export default function SingleChange(change: ChangeInfo) {
  const [color, typeOfChange] =
    change.typeOfChange != LessonModification.Other
      ? useModification({ modification: change.typeOfChange })
      : [null, null]

  return (
    <div className="flex gap-1">
      <div className="flex gap-[7px]">
        {/* Type of change*/}
        {typeOfChange && (
          <p className={`${changeTextColor(color)} font-bold`}>
            {typeOfChange}
          </p>
        )}

        {/* Change data */}
        {<p className="font-medium">{change.data}</p>}
      </div>
    </div>
  )
}
