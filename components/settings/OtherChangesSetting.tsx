import { SettingsComponent } from './types'
import lightModeExample from '../../public/lightMode.png'
import otherChangesExample from '../../public/otherChangesLight.png'
import asOptionsPage from './layout/OptionsLayout'

const OtherChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
  save,
  navigateBack,
}) => {
  return asOptionsPage({
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
  })
}

export default OtherChangesSetting
