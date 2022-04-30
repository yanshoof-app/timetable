import { IChangeIscool, ISCOOL, IscoolDate } from '@yanshoof/iscool'
import { ServerTimetable } from '../utils'
import { startOfWeek } from '../utils/data/updates'
import {
  ANKORI_CHANGES,
  ANKORI_EVENT,
  ANKORI_SETTINGS,
  CHANGE_NOT_IN_HOUR,
  WEEK_CHANGES_START,
} from '../utils/sample-constants'
import { IscoolSettings } from '../utils/settings/IscoolSettings'

let changes: IChangeIscool[]
const currentWeekStart = startOfWeek()
/***
 * change changes date so that test will pass regardless of current date.
 */
function setup() {
  const timeToAdd = currentWeekStart.getTime() - WEEK_CHANGES_START.getTime()
  changes = ANKORI_CHANGES.map(({ Date, ...change }) => {
    const updatedTime = new IscoolDate(Date).time + timeToAdd
    return { ...change, Date: `Date(${updatedTime})` }
  })
}

describe('Tests special changes', () => {
  beforeAll(setup)
  const settings = new IscoolSettings(ANKORI_SETTINGS)
  const timetable = new ServerTimetable(settings)

  it('Select changes from a list with changes of another week', () => {
    const { newChanges, newOthersChanges, newEvents } =
      timetable.selectNewChanges(currentWeekStart, changes)
    expect(
      newChanges.length + newOthersChanges.length + newEvents.length
    ).toBeLessThan(changes.length)
  })

  it('Tests change of own study group, in different hour', () => {
    const { newChanges, newOthersChanges } = timetable.selectNewChanges(
      currentWeekStart,
      [CHANGE_NOT_IN_HOUR]
    )
    expect(newChanges.length).toBe(0)
    expect(newOthersChanges.length).toBe(1)
    expect(ISCOOL.toChange(CHANGE_NOT_IN_HOUR)).toStrictEqual(
      newOthersChanges[0]
    )
  })

  it('Tests events', () => {
    console.log(ISCOOL.toChange(ANKORI_EVENT))
    const { newEvents, newChanges, newOthersChanges } =
      timetable.selectNewChanges(currentWeekStart, [ANKORI_EVENT])
    expect(newChanges.length).toBe(0)
    expect(newOthersChanges.length).toBe(0)
    expect(newEvents.length).toBe(1)
    expect(ISCOOL.toChange(ANKORI_EVENT)).toStrictEqual(newEvents[0])
  })
})
