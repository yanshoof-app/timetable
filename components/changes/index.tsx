import { HourlyChanges } from '../../hooks/useChanges'
import GroupOfChanges from './GroupOfChanges'

export default function ChangesOfHour(hour: HourlyChanges) {
  return (
    <div className="flex flex-col gap-2">
      {hour.changes.length > 0 && (
        <GroupOfChanges
          hour={hour.hour}
          studyGroup={hour.studyGroup}
          changes={hour.changes}
        />
      )}

      {hour.otherChanges.length > 0 && (
        <GroupOfChanges hour={hour.hour} changes={hour.otherChanges} />
      )}

      {hour.events.length > 0 && (
        <GroupOfChanges hour={hour.hour} changes={hour.events} />
      )}
    </div>
  )
}
