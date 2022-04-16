import { SettingsComponent } from './types'
import lightModeExample from '../../public/lightMode.png'
import otherChangesExample from '../../public/otherChangesLight.png'
import OptionsLayout from './layout/OptionsLayout'

const OtherChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
  save,
  navigateBack,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {OptionsLayout({
        options: [
          { label: 'הצג', value: true },

          { label: 'הסתר', value: false },
        ],
        value: value,
        images: [
          { image: otherChangesExample, value: true },
          { image: lightModeExample, value: false },
        ],
        onChange: onChange,
      })}
      <div className="grid grid-cols-2 px-3"></div>
    </div>
  )
}

export default OtherChangesSetting
