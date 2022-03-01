import { useState } from 'react'
import RadioButton from '../forms/RadioButton'
import OthersChangesExample from './examples/OthersChangesExample'

export default function OthersChangesPick(OthersChanges: boolean) {
  const [toShow, setShow] = useState(OthersChanges)

  return (
    <div className="p-[1rem] flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none fk">
        <OthersChangesExample
          onClick={() => setShow(false)}
          variant={'hide'}
          className="h-fit"
        />
        <OthersChangesExample
          onClick={() => setShow(true)}
          variant={'show'}
          className=""
        />
      </div>
      <div className="flex justify-between px-[calc(25%-12px)] h-fit">
        <RadioButton
          selected={!toShow}
          label={'הסתר'}
          onClick={() => setShow(false)}
        />
        <RadioButton
          selected={toShow}
          label={'הצג'}
          onClick={() => setShow(true)}
        />
      </div>
    </div>
  )
}
