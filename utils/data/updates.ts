import { DAYS_IN_WEEK } from '@yanshoof/types'

export function startOfWeek() {
  const now = new Date()
  const sunday = new Date(now.setDate(now.getDate() - now.getDay())) //Sunday of this week
  sunday.setHours(0, 0, 0, 0)

  return sunday
}

export function endOfWeek() {
  const prevSunday = startOfWeek()
  prevSunday.setDate(prevSunday.getDate() + DAYS_IN_WEEK)

  return prevSunday
}
