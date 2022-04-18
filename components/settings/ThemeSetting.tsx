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

const ThemeSetting: SettingsComponent<ThemePreference> = ({
  value: selectedTheme,
  onChange: setSelectedTheme,
  save,
  navigateBack,
}) => {
  const { theme } = useStorage() //TODO: Method that support system preference || useExample hook

  const example1 = theme === 'light' ? lightModeExample : darkLightModeExample
  const example2 = theme === 'light' ? darkModeExample : darkDarkModeExample

  return OptionsLayout({
    options: [
      { label: 'בהיר', value: 'light' },
      { label: 'מערכת', value: 'system' },
      { label: 'כהה', value: 'dark' },
    ],
    value: selectedTheme,
    images: [
      { image: example1, value: 'light' },
      { image: example2, value: 'dark' },
    ],
    onChange: setSelectedTheme,
  })
}

export default ThemeSetting
