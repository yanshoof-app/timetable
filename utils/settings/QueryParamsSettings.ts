import { Timetable } from '..'
import { IScheduleSettings } from '../../interfaces'
import { InputError } from '../../interfaces/errors'
import { toTuple } from '../data/arrays'

export type QueryParams = {
  showOthersChanges: string
  studyGroups: string
  studyGroupMap: string
}

/**
 * Represents settings that came from an HTTP request
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements IScheduleSettings
 */
export class QueryParamsSettings implements IScheduleSettings {
  private static DAY_HOUR_QPARAMS_DELIMITER = '/'
  private static STUDY_GROUP_QPARAMS_DELIMITER = ':'
  private static DELIMITER = ','
  readonly showOthersChanges: boolean
  readonly studyGroups: [string, string][]
  readonly studyGroupMap: Map<string, number>

  /**
   * Converts a settings object to query parameters
   * @param settings the settings to convert
   * @returns a representation of the settings as query parameters
   */
  public static toQueryParams<T extends IScheduleSettings>({
    showOthersChanges,
    studyGroups,
    studyGroupMap,
    ...rest
  }: T): Omit<T, 'showOthersChanges' | 'studyGroups' | 'studyGroupMap'> &
    QueryParams {
    return {
      ...rest,
      showOthersChanges: showOthersChanges ? 'true' : 'false',
      studyGroups: studyGroups
        .map((sg) => sg.join(this.STUDY_GROUP_QPARAMS_DELIMITER))
        .join(this.DELIMITER),
      studyGroupMap: Array.from(studyGroupMap.keys())
        .map(
          (key) =>
            `${key.replace(
              this.DELIMITER,
              this.DAY_HOUR_QPARAMS_DELIMITER
            )}:${studyGroupMap.get(key)!}`
        )
        .join(this.DELIMITER),
    }
  }

  /**
   * Convert a string to a boolean in the form of 0/1 or true/false
   * @param str the string to convert
   * @returns a boolean
   * @throws InputError if didn't get a satisfying result
   */
  private static toBoolean(str: string): boolean {
    if (str.match(/\s*(true|1)\s*/i)) return true
    if (str.match(/\s*(false|0)\s*/i)) return false
    throw new InputError(
      `Failed to convert string "${str}" to boolean, expected 0/1 or false/true`
    )
  }

  /**
   * Check if a given number is an integer in a given range, end exclusive
   * @param number the number to check
   * @param min the minimum value number could be equal to, inclusive
   * @param max the first value number cannot be equal to after min
   */
  private static checkInRange(number: number, min: number, max: number) {
    return (
      !isNaN(number) &&
      Number.isInteger(number) &&
      number >= min &&
      number < max
    )
  }

  /**
   * Builds a settings object from query params
   * @param showOthersChanges a changes boolean string (false/true or 0/1)
   * @param studyGroups a study group list in the form subject:teacher,subject:teacher,...
   * @param studyGroupMap a study group map in the form of day/hour:index,day/hour:index,...
   */
  constructor({
    showOthersChanges = 'true', // defaults to true
    studyGroups = '',
    studyGroupMap = '',
  }: Partial<QueryParams>) {
    this.showOthersChanges = QueryParamsSettings.toBoolean(showOthersChanges)

    // build study group array
    this.studyGroups = []
    for (let studyGroup of studyGroups.split(QueryParamsSettings.DELIMITER)) {
      const columnSeparatedFields = toTuple(
        studyGroup.split(QueryParamsSettings.STUDY_GROUP_QPARAMS_DELIMITER),
        new InputError(
          `Invalid study group "${studyGroup}", expected <subject>:<teacher>`
        )
      )
      this.studyGroups.push(columnSeparatedFields)
    }

    // build study group map
    this.studyGroupMap = new Map()
    for (let entry of studyGroupMap.split(QueryParamsSettings.DELIMITER)) {
      const inputError = new InputError(
        `Invalid input "${entry}" for study group array entry. Expected [day]/[hour]:[index]`
      )
      const [dayHour, indexStr] = toTuple(
        entry.split(QueryParamsSettings.STUDY_GROUP_QPARAMS_DELIMITER),
        inputError
      )
      const [dayStr, hourStr] = toTuple(
        dayHour.split(QueryParamsSettings.DAY_HOUR_QPARAMS_DELIMITER),
        inputError
      )

      // validate values
      const [day, hour, index] = [dayStr, hourStr, indexStr].map(Number)
      if (!QueryParamsSettings.checkInRange(day, 0, Timetable.DAYS_IN_WEEK))
        throw new InputError(`Invalid day "${day}" in study group map`)

      if (
        !QueryParamsSettings.checkInRange(hour, 0, Timetable.HOURS_OF_SCHEDULE)
      )
        throw new InputError(`Invalid hour "${hour}" in study group map`)

      if (!QueryParamsSettings.checkInRange(index, -1, this.studyGroups.length))
        throw new InputError(
          `Invalid index in study group at day ${dayStr}, hour ${hourStr}: ${index}`
        )

      const key = `${day},${hour}`
      if (this.studyGroupMap.has(key))
        throw new InputError(
          `Multiple definitions of lesson in day ${day}, hour ${hour}`
        )

      this.studyGroupMap.set(key, index)
    }
  }
}
