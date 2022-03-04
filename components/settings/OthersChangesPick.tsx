import { useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import RadioButton from '../forms/RadioButton'
import OthersChangesExample from './examples/OthersChangesExample'

export default function OthersChangesPick() {
  const { showOthersChanges, setOthersChangesPreference } = useStorage()

  return (
    <div className="p-[1rem] flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none fk">
        <OthersChangesExample
          onClick={() => setOthersChangesPreference(false)}
          variant={'hide'}
          className="h-fit"
        />
        <OthersChangesExample
          onClick={() => setOthersChangesPreference(true)}
          variant={'show'}
          className=""
        />
      </div>
      <div className="flex justify-between px-[calc(25%-12px)] h-fit">
        <RadioButton
          selected={!showOthersChanges}
          label={'הסתר'}
          onClick={() => setOthersChangesPreference(false)}
        />
        <RadioButton
          selected={showOthersChanges}
          label={'הצג'}
          onClick={() => setOthersChangesPreference(true)}
        />
      </div>
    </div>
  )
}
