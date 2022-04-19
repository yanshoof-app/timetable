import { useMemo } from 'react'

/**
 * An array representing hebrew days from 0 to 6.
 * @example
 * HEBREW_DAYS[0] // 'ראשון'
 */
export const HEBREW_DAYS = [
  'ראשון',
  'שני',
  'שלישי',
  'רביעי',
  'חמישי',
  'שישי',
  'שבת',
]

export const HEBREW_SHORT_DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']

/**
 * An array representing hebrew months from 0 to 11.
 * @example
 * HEBREW_MONTHS[2] // 'מרץ'
 */
export const HEBREW_MONTHS = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
]

/**
 * Day in hebrew
 */
const DAY = 'יום'

/**
 * Of in hebrew
 */
const OF = 'ב'

/**
 * Returns a string representation of the date, in hebrew
 * @param date the date to represent
 */
export default function useHebrewDate(date: Date) {
  return useMemo(() => {
    return `${DAY} ${HEBREW_DAYS[date.getDay()]}, ${date.getDate()} ${OF}${
      HEBREW_MONTHS[date.getMonth()]
    }`
  }, [date])
}

export function daylessHebrewDate(date: Date) {
  return `${date.getDate()} ${OF}${HEBREW_MONTHS[date.getMonth()]}`
}
