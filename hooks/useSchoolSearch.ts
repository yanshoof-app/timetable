import { ISchoolLookupResult } from '../interfaces'
import { useHTTP } from './useHTTP'

const SCHOOL_SEARCH_URL = '/api/school'

export function useSchoolSearch(search: string): {
  results: ISchoolLookupResult[]
} {
  const { data } = useHTTP<any, ISchoolLookupResult[]>({
    path: `${SCHOOL_SEARCH_URL}?search=${search}`,
    initialValue: [],
  })
  const results = data

  return { results }
}
