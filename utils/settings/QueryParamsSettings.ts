import { IScheduleSettings } from '../../interfaces';
import { InputError } from '../../interfaces/errors';

export type QueryParams = {
  showOthersChanges: string;
  studyGroups: string;
  studyGroupMap: string;
};

/**
 * Represents settings that came from an HTTP request
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements IScheduleSettings
 */
export class QueryParamsSettings implements IScheduleSettings {
  readonly showOthersChanges: boolean;
  readonly studyGroups: [string, string][];
  readonly studyGroupMap: Map<string, number>;

  /**
   * Convert a string to a boolean in the form of 0/1 or true/false
   * @param str the string to convert
   * @returns a boolean
   * @throws InputError if didn't get a satisfying result
   */
  private static toBoolean(str: string): boolean {
    if (str.match(/\s*(true|1)\s*/i).length) return true;
    if (str.match(/\s*(false|0)\s*/i).length) return false;
    throw new InputError('Failed to convert field to boolean');
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
    this.showOthersChanges = QueryParamsSettings.toBoolean(showOthersChanges);

    // build study group array
    for (let studyGroup of studyGroups.split(',')) {
    }
    /*
    
    const studyGroupsConlumnSep = studyGroupArr.filter(
      value => value.match(/:/i).length == 1
    );
    if (studyGroupArr.length != studyGroupsConlumnSep.length)
      throw new InputError(
        'Subjects and teachers must be separated by exactly one column and each pair must be comma delimited'
      );
    this.studyGroups = studyGroupsConlumnSep.map(
      value => value.split(':') as [string, string]
    ); */

    // build study group map
  }
}
