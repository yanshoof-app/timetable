import { IClassLookup } from '../../interfaces'

export interface IClassLookupContext extends Pick<IClassLookup, 'getId'> {
  isLoadingClasses: boolean
  revalidate(): unknown
}
