import { useMemo } from 'react'
import { HourOfDay } from '../interfaces'

/**
 *
 * @param hours the hours of day that should turn to ranges
 * @returns an array of arrays, each representing a range
 */
export default function useRanges(hours: HourOfDay[]): HourOfDay[][] {
  return useMemo(() => {
    let hourSet = new Set(hours),
      recordedSet = new Set()
    let ranges = []
    for (let hour of hours) {
      if (recordedSet.has(hours)) continue
      // hour is not recorded
      let range = [hour],
        currentHour = (hour + 1) as HourOfDay
      recordedSet.add(hour)
      while (hourSet.has(currentHour)) {
        // there is a lesson in that hour
        if (!recordedSet.has(currentHour)) {
          // hour was not recorded before
          range.push(currentHour)
          recordedSet.add(hour)
        } else {
          // there is a range already existing with the current hour as the first hour
          const indexOfRange = ranges.findIndex(
            ([first]) => first == currentHour
          )
          range.push(...ranges.splice(indexOfRange, 1)) // push hours of deleted range to current range
        }
        currentHour++
      }
      ranges.push(range)
    }
    ranges.sort(([firstA], [firstB]) => firstA - firstB) // sort by first hour
    return ranges
  }, [hours])
}
