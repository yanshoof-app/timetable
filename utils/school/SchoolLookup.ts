import {
  fetchSchoolsWithQuery,
  ISchoolSearchResultIscool,
  ISCOOL,
} from '@yanshoof/iscool'
import { ISchoolLookup, ISchoolLookupResult } from '../../interfaces'

/**
 * Lookup object for schools
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements ISchoolLookup
 */
export class SchoolLookup implements ISchoolLookup {
  results: ISchoolLookupResult[]

  constructor(iScoolResults: ISchoolSearchResultIscool[]) {
    this.results = iScoolResults.map(ISCOOL.toSchoolLookupResult)
  }

  /**
   * Fetches searching for schools (a different URL query from the rest of the fetches, and only used in this context)
   * @param query the query to search
   * @returns an object returned by the iScool server, in the type specified by the caller
   * @example
   * const schoolLookup = SchoolLookup.buildFromQuery(460030); // results: [{ name: "עמי אסף בית ברל", symbol = 460030 }]
   */
  static async buildFromQuery(query: string | number) {
    const { Schools } = await fetchSchoolsWithQuery(query)
    if (Schools)
      // if the field is null (search failed)
      return new SchoolLookup([])
    return new SchoolLookup(Schools)
  }
}
