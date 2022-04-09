import { useEffect } from 'react'
import { IStorageContext } from './types'

export function useClearUnusedStudyGroups(storage: IStorageContext) {
  const { studyGroups, studyGroupMap, setStudyGroups, setStudyGroupMap } =
    storage
  useEffect(() => {
    const studyGroupMapValues = [...studyGroupMap.values()]
    for (let i = 0; i < studyGroups.length; i++) {
      //detect unused study group
      if (studyGroupMapValues.includes(i)) continue

      //remove the unused study group
      setStudyGroups((prev) => {
        prev.splice(i, 1)
        return prev
      })

      //updates indexes in studyGroupMap
      setStudyGroupMap((prev) => {
        const map = new Map(prev)
        for (let key of map.keys()) {
          if (map.get(key) > i) map.set(key, map.get(key) - 1)
        }
        return map
      })
    }
  }, [studyGroupMap, studyGroups, setStudyGroupMap, setStudyGroups])
}
