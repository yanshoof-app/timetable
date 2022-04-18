import { ComponentType, Dispatch, SetStateAction } from 'react'

export interface ISettingsComponentProps<T> {
  value: T
  onChange: Dispatch<SetStateAction<T>>
  save: (value?: T) => unknown
  navigateBack: () => unknown
  applyImmedietly?: boolean
}

export type SettingsComponent<
  T,
  AdditionalProps extends {} = {}
> = ComponentType<ISettingsComponentProps<T> & AdditionalProps>
