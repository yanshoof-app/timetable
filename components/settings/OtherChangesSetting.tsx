import RadioButton from '../forms/RadioButton'
import OthersChangesExample from './examples/OthersChangesExample'
import { SettingsComponent } from './types'
import Image from 'next/image'
import lightModeExample from '../../public/lightModeExample.png'
import otherChangesExample from '../../public/otherChangesExample.png'
import OptionsLayout from './layout/OptionsLayout'

const OtherChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
  save,
  navigateBack,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/*<div>
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
        </div>*/}
      <OptionsLayout
        options={[
          { label: 'הצג', value: true },

          { label: 'הסתר', value: false },
        ]}
        value={value}
        images={[
          { image: otherChangesExample, value: true },
          { image: lightModeExample, value: false },
        ]}
        onChange={onChange}
      />
      <div className="grid grid-cols-2 px-3"></div>
    </div>
  )
}

export default OtherChangesSetting
