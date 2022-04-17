import { useMemo } from 'react'
import { useStorage } from '../contexts/Storage'

/**
 * Filters study groups - only used ones
 * @returns an set of used study group indexes
 */
export default function useActiveStudyGroups() {
  const { studyGroupMap } = useStorage()
  return useMemo(() => new Set(studyGroupMap.values()), [studyGroupMap])
}
