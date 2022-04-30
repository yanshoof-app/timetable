import ChangesOfHour from '.'
import { IHourlyChanges } from '../../hooks/useChanges'
import { dateOfDay } from '../../hooks/useDate'
import { daylessHebrewDate, HEBREW_DAYS } from '../../hooks/useHebrewDate'
import { DayOfWeek } from '../../interfaces'

export interface IChangesOfDayProps {
  dayOfWeek: DayOfWeek
  date: Date
  currentDay: DayOfWeek
  changesOfDay: IHourlyChanges[]
}

export default function ChangesOfDay({
  dayOfWeek,
  date,
  currentDay,
  changesOfDay,
}: IChangesOfDayProps) {
  return (
    <div className="flex flex-col border-b-2 pb-2 border-gray-200 last:border-b-0">
      {/* Date */}
      <div
        className={`flex gap-1 ${
          dayOfWeek == currentDay ? 'text-primary-500' : 'dark:text-gray-300'
        }`}
      >
        <p className="font-semibold text-lg">
          {`יום ${HEBREW_DAYS[dayOfWeek]}`},
        </p>
        <p className="font-medium text-lg">
          {daylessHebrewDate(dateOfDay(dayOfWeek, date))}
        </p>
      </div>

      {/* Changes */}
      <div className="flex flex-col gap-2 pr-2">
        {changesOfDay.map((hour, index) => (
          <ChangesOfHour {...hour} key={index} />
        ))}
      </div>
    </div>
  )
}
