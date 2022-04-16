import { ThemePreference } from '../../contexts/Storage/types'
import OptionsLayout from './layout/OptionsLayout'
import lightModeExample from '../../public/lightMode.png'
import darkModeExample from '../../public/darkMode.png'
import { SettingsComponent } from './types'

const ThemeSetting: SettingsComponent<ThemePreference> = ({
  value: selectedTheme,
  onChange: setSelectedTheme,
  save,
  navigateBack,
}) => {
  return OptionsLayout({
    options: [
      { label: 'בהיר', value: 'light' },
      { label: 'מערכת', value: 'system' },
      { label: 'כהה', value: 'dark' },
    ],
    value: selectedTheme,
    images: [
      { image: lightModeExample, value: 'light' },
      { image: darkModeExample, value: 'dark' },
    ],
    onChange: setSelectedTheme,
  })
}

export default ThemeSetting
