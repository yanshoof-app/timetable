import { useMemo } from 'react'
import { HourOfDay } from '../interfaces'

/**
 *
 * @param hours the hours of day that should turn to ranges
 * @returns an array of arrays, each representing a range
 */
export default function useRanges(hours: HourOfDay[]): HourOfDay[][] {
  return useMemo(() => {
    const sortedHours = hours.sort()
    let index = 1,
      currentRangeIndex = 0,
      ranges = [[sortedHours[0]]]
    while (index < sortedHours.length) {
      if (sortedHours[index] != sortedHours[index - 1] + 1) {
        // create new range
        currentRangeIndex++
        ranges.push([])
      }
      ranges[currentRangeIndex].push(sortedHours[index])
      index++
    }
    return ranges
  }, [hours])
}
