/**
 * Represents a single search result
 */
export interface ISchoolLookupResult {
  name: string;
  symbol: number;
}

/**
 * Represents a search result
 */
export interface ISchoolLookup {
  results: ISchoolLookupResult[];
}
