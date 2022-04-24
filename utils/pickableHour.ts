import { DayOfWeek, HourOfDay } from '../interfaces'

export function isPickableHour(day: DayOfWeek, hour: HourOfDay) {
  return hour > 7 || hour < 1 || day > 4
}
