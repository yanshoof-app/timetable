import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ISchoolLookupResult } from '../interfaces'
import useDebounce from './useDebounce'
import { useHTTP } from './useHTTP'

const SCHOOL_SEARCH_URL = '/api/school'

export interface ISchoolSearchHook {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  searchResults: ISchoolLookupResult[]
  selectedSchool: ISchoolLookupResult
  setSelectedIndex: Dispatch<SetStateAction<number>>
  isLoading: boolean
  error: boolean
  showOptions: boolean
}

const NO_INDEX = -1

export function useSchoolSearch(): ISchoolSearchHook {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(NO_INDEX)
  const debouncedQuery = useDebounce(searchQuery, 1000)
  const {
    data,
    isLoading: isFetchLoading,
    error,
    doFetch,
  } = useHTTP<{ search: string }, ISchoolLookupResult[]>({
    path: SCHOOL_SEARCH_URL,
    fetchOnMount: false,
    initialValue: [],
  })

  const selectedSchool = useMemo(
    () => (selectedIndex == NO_INDEX ? undefined : data[selectedIndex]),
    [data, selectedIndex]
  )

  useEffect(() => {
    if (!!debouncedQuery.trim().length && !selectedSchool)
      doFetch({ search: debouncedQuery })
  }, [debouncedQuery, doFetch, selectedSchool])

  useEffect(() => {
    setSelectedIndex(NO_INDEX)
  }, [searchQuery])

  const isLoading = useMemo(
    () => debouncedQuery !== searchQuery || isFetchLoading,
    [debouncedQuery, isFetchLoading, searchQuery]
  )

  // overcome state change delay
  const debouncedIsLoading = useDebounce(isLoading, 100)

  return {
    searchQuery,
    setSearchQuery,
    selectedSchool,
    setSelectedIndex,
    error,
    searchResults: data,
    showOptions: selectedIndex == NO_INDEX,
    isLoading: debouncedIsLoading,
  }
}
