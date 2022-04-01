import { useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import RadioButton from '../forms/RadioButton'
import { BackRTL } from '../icons'
import Layout from '../Layout'
import PageTitle from '../ui/PageTitle'
import OthersChangesExample from './examples/OthersChangesExample'

export default function OthersChangesPick() {
  const { setOthersChangesPreference } = useStorage()
  const [selectedPreference, setSelectedPreference] = useState(false)

  return (
    <Layout className="px-4">
      <PageTitle
        title="שינויים של אחרים"
        startIcon={BackRTL}
        onStartIconClick={() => setOthersChangesPreference(selectedPreference)}
      />
      <div className="flex flex-col gap-2">
        <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none fk">
          <OthersChangesExample
            onClick={() => setSelectedPreference(false)}
            variant={'hide'}
            className="h-fit"
          />
          <OthersChangesExample
            onClick={() => setSelectedPreference(true)}
            variant={'show'}
            className="h-[292.22px]" //TODO: Find a better method to make them same height
          />
        </div>
        <div className="flex justify-between px-[calc(25%-12px)] h-fit">
          <RadioButton
            selected={!selectedPreference}
            label={'הסתר'}
            onClick={() => setSelectedPreference(false)}
          />
          <RadioButton
            selected={selectedPreference}
            label={'הצג'}
            onClick={() => setSelectedPreference(true)}
          />
        </div>
      </div>
    </Layout>
  )
}
