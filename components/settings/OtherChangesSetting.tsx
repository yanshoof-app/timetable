import RadioButton from '../forms/RadioButton'
import OthersChangesExample from './examples/OthersChangesExample'
import ApplyCancelButtons from './layout/ApplyCancelButtons'
import { SettingsComponent } from './types'
import Image from 'next/image'
import lightModeExample from '../../public/lightModeExample.png'
import otherChangesExample from '../../public/otherChangesExample.png'

const OtherChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
  save,
  navigateBack,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row bg-gray-200 justify-between p-3 rounded-[26.4px] gap-3 select-none fk">
        <div>
          <Image src={otherChangesExample} />
          <RadioButton
            selected={value}
            label={'הצג'}
            onClick={() => onChange(true)}
          />
        </div>
        <div>
          <Image src={otherChangesExample} width={500} />
          <RadioButton
            selected={!value}
            label={'הסתר'}
            onClick={() => onChange(false)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 px-3"></div>
      <ApplyCancelButtons
        apply={save}
        cancel={navigateBack}
        className="justify-end px-8 pt-8"
      />
    </div>
  )
}

export default OtherChangesSetting
