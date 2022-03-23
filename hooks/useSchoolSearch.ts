import { useEffect, useState } from 'react'
import { ISchoolLookupResult } from '../interfaces'
import { useHTTP } from './useHTTP'

const SCHOOL_SEARCH_URL = '/api/school'

export function useSchoolSearch(search: string): ISchoolLookupResult[] {
  const [results, setResults] = useState([])
  const { data } = useHTTP<any, ISchoolLookupResult[]>({
    path: `${SCHOOL_SEARCH_URL}?search=${search}`,
    initialValue: [],
  })

  useEffect(() => {
    setResults(data)
  }, [data])

  return results
}
