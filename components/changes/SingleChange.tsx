import { IChangeInfo } from '../../hooks/useChanges'
import useModification from '../../hooks/useModification'
import { LessonModification } from '../../interfaces'
import { changeTextColor } from '../timetable/Lesson'

export default function SingleChange(change: IChangeInfo) {
  const [color, typeOfChange] = useModification({
    modification: change.typeOfChange,
  })

  return (
    <div className="flex gap-1">
      <div className="flex gap-[7px]">
        {/* Type of change*/}
        {change.typeOfChange != LessonModification.Other && (
          <p className={`${changeTextColor(color)} font-bold`}>
            {typeOfChange}
          </p>
        )}

        {/* Change data */}
        {<p className="font-medium dark:text-white">{change.data}</p>}
      </div>
    </div>
  )
}
