import { endOfWeek, startOfWeek } from '../utils/data/updates'

const WEEK = 1000 * 60 * 60 * 24 * 7
const weekEnd = endOfWeek()
const weekStart = startOfWeek()
const now = new Date()

describe('Tests the date methods of the updates module', () => {
  it('Tests the start of the week method', () => {
    expect(now.getTime()).toBeGreaterThan(weekStart.getTime())
    expect(now.getTime() - weekStart.getTime()).toBeLessThan(WEEK)
  })
  it('Tests the end of week method', () => {
    expect(now.getTime()).toBeLessThan(weekEnd.getTime())
    expect(weekEnd.getTime() - now.getTime()).toBeLessThan(WEEK)
  })
  it('Tests both', () => {
    expect(weekEnd.getTime() - weekStart.getTime()).toBe(WEEK)
  })
})
