import { IClassLookup } from '../../interfaces'

export interface IClassLookupContext {
  getId: (grade: number, classNum: number) => number
  isLoadingClasses: boolean
  revalidate(): unknown
}
