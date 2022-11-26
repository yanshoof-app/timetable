import { IscoolClassLookup } from '@yanshoof/iscool'
import { useMemo } from 'react'
import { useStorage } from '../contexts/Storage'

export default function useTotalClasses() {
  const { classIds } = useStorage()
  return useMemo(() => {
    return classIds.reduce((prev, grade) => {
      return (
        grade.filter((id) => id != IscoolClassLookup.CLASS_NOT_FOUND).length +
        prev
      )
    }, 0)
  }, [classIds])
}