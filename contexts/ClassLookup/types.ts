import { IClassLookup } from '../../interfaces'

export interface IClassLookupContext extends IClassLookup {
  isLoadingClasses: boolean
  revalidate(): unknown
}
