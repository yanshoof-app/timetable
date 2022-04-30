export function isNewWeek(lastUserUpdate: Date) {
  const now = new Date()
  const sunday = new Date(now.setDate(now.getDate() - now.getDay())) //Sunday of this week

  if (sunday > lastUserUpdate) return true

  return false
}
