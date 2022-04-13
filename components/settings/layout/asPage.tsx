import { NextRouter, useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useStorage } from '../../../contexts/Storage'
import { IStorageContext } from '../../../contexts/Storage/types'
import { ISettingsComponentProps, SettingsComponent } from '../types'
import SettingsPageLayout, {
  ISettingsPageLayoutProps,
} from './SettingsPageLayout'

export type PropProvider<T, A extends {} = {}> = (
  ctx: IStorageContext,
  router: NextRouter
) => A & Partial<ISettingsComponentProps<T>>

function asPage<T, AdditionalProps>(
  Component: SettingsComponent<T, AdditionalProps>,
  layoutProps: Omit<ISettingsPageLayoutProps, 'onBackPress'>,
  propProvider: PropProvider<T, AdditionalProps>
) {
  return function Page() {
    const storage = useStorage()
    const router = useRouter()
    const {
      value: initialValue,
      save,
      ...additionalProps
    } = useMemo(() => propProvider(storage, router), [storage, router])
    const [selectedValue, setSelectedValue] = useState(initialValue)
    const saveCallback = useCallback(
      (ob?: T) => {
        console.log(ob, selectedValue)
        if (ob) save(ob)
        else save(selectedValue)
      },
      [save, selectedValue]
    )
    return (
      <SettingsPageLayout {...layoutProps} onBackPress={saveCallback}>
        <Component
          {...(additionalProps as unknown as AdditionalProps)}
          value={selectedValue}
          onChange={setSelectedValue}
          save={saveCallback}
        />
      </SettingsPageLayout>
    )
  }
}

export default asPage
