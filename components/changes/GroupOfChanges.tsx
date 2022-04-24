import { IChangeInfo } from '../../hooks/useChanges'
import { HourOfDay } from '../../interfaces'
import SingleChange from './SingleChange'

interface ChangesGroupProps {
  hour: HourOfDay
  studyGroup?: string
  changes: IChangeInfo[]
}

export default function GroupOfChanges({
  hour,
  studyGroup = '',
  changes,
}: ChangesGroupProps) {
  return (
    <div className="flex flex-col">
      <p className="flex gap-[7px] truncate">
        {/* Hour */}
        <span className="font-bold dark:text-white">
          שעה {hour}
          {!studyGroup && ':'}
        </span>

        {/* Study group*/}
        {studyGroup && (
          <span className="font-semibold dark:text-gray-200 truncate">
            {studyGroup}:
          </span>
        )}
      </p>

      {/* Changes*/}
      <div className="flex flex-col pr-2">
        {changes.map((change, index) => (
          <SingleChange {...change} key={index} />
        ))}
      </div>
    </div>
  )
}
