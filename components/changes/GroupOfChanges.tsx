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
      <div className="flex gap-[7px]">
        {/* Hour */}
        <p className="font-bold dark:text-white">
          שעה {hour}
          {!studyGroup && ':'}
        </p>

        {/* Study group*/}
        {studyGroup && (
          <p className="font-semibold dark:text-gray-200">{studyGroup}:</p>
        )}
      </div>

      {/* Changes*/}
      <div className="flex flex-col pr-2">
        {changes.map((change, index) => (
          <SingleChange {...change} key={index} />
        ))}
      </div>
    </div>
  )
}
