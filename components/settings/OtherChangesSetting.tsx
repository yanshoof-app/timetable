import { SettingsComponent } from './types'
import OptionsLayout from './layout/OptionsLayout'
import { useStorage } from '../../contexts/Storage'

//light mode examples
import lightModeExample from '../../public/lightMode.png'
import otherChangesExample from '../../public/otherChangesLight.png'

//dark mode examples
import darkLightModeExample from '../../public/darkLightMode.png'
import darkOtherChangesExample from '../../public/darkOtherChanges.png'
import useDarkMode from '../../hooks/useDarkMode'
import useExamples from '../../hooks/useExamples'

const OtherChangesSetting: SettingsComponent<boolean> = ({
  value,
  onChange,
  save,
  navigateBack,
}) => {
  const isDarkMode = useDarkMode()

  const { ex1, ex2 } = useExamples(
    { light: lightModeExample, dark: darkLightModeExample },
    { light: otherChangesExample, dark: darkOtherChangesExample },
    isDarkMode
  )

  return OptionsLayout({
    options: [
      { label: 'הצג', value: true },

      { label: 'הסתר', value: false },
    ],
    value: value,
    images: [
      { image: ex2, value: true },
      { image: ex1, value: false },
    ],
    onChange: onChange,
  })
}

export default OtherChangesSetting
