import RadioButton from '../forms/RadioButton'
import OthersChangesExample from './examples/OthersChangesExample'
import { SettingsComponent } from './types'

const OthersChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none fk">
        <OthersChangesExample
          onClick={() => onChange(false)}
          variant={'hide'}
          className="h-fit"
        />
        <OthersChangesExample
          onClick={() => onChange(true)}
          variant={'show'}
          className="h-[292.22px]" //TODO: Find a better method to make them same height
        />
      </div>
      <div className="flex justify-between px-[calc(25%-12px)] h-fit">
        <RadioButton
          selected={!value}
          label={'הסתר'}
          onClick={() => onChange(false)}
        />
        <RadioButton
          selected={value}
          label={'הצג'}
          onClick={() => onChange(true)}
        />
      </div>
    </div>
  )
}

export default OthersChangesSetting
