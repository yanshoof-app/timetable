import { ThemePreference } from '../../contexts/Storage/types'
import OptionsLayout from './layout/OptionsLayout'
import { SettingsComponent } from './types'
import { useStorage } from '../../contexts/Storage'

//light mode examples
import lightModeExample from '../../public/lightMode.png'
import darkModeExample from '../../public/darkMode.png'

//dark mode examples
import darkLightModeExample from '../../public/darkLightMode.png'
import darkDarkModeExample from '../../public/darkDarkMode.png'
import useExamples from '../../hooks/useExamples'
import useDarkMode from '../../hooks/useDarkMode'

const ThemeSetting: SettingsComponent<ThemePreference> = ({
  value: selectedTheme,
  onChange: setSelectedTheme,
  save,
  navigateBack,
}) => {
  const isDarkMode = useDarkMode()

  const { ex1, ex2 } = useExamples(
    { light: lightModeExample, dark: darkLightModeExample },
    { light: lightModeExample, dark: darkLightModeExample },
    isDarkMode
  )

  return OptionsLayout({
    options: [
      { label: 'בהיר', value: 'light' },
      { label: 'מערכת', value: 'system' },
      { label: 'כהה', value: 'dark' },
    ],
    value: selectedTheme,
    images: [
      { image: ex1, value: 'light' },
      { image: ex2, value: 'dark' },
    ],
    onChange: setSelectedTheme,
  })
}

export default ThemeSetting
