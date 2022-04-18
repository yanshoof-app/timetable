import { SettingsComponent } from './types'
import OptionsLayout from './layout/OptionsLayout'
import { useStorage } from '../../contexts/Storage'

//light mode examples
import lightModeExample from '../../public/lightMode.png'
import otherChangesExample from '../../public/otherChangesLight.png'

//dark mode examples
import darkLightModeExample from '../../public/darkLightMode.png'
import darkOtherChangesExample from '../../public/darkOtherChanges.png'

const OtherChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
  save,
  navigateBack,
}) => {
  const { theme } = useStorage() //TODO: Method that support system preference || useExample hook

  const example1 = theme === 'light' ? lightModeExample : darkLightModeExample
  const example2 =
    theme === 'light' ? otherChangesExample : darkOtherChangesExample

  return OptionsLayout({
    options: [
      { label: 'הצג', value: true },

      { label: 'הסתר', value: false },
    ],
    value: value,
    images: [
      { image: example2, value: true },
      { image: example1, value: false },
    ],
    onChange: onChange,
  })
}

export default OtherChangesSetting
