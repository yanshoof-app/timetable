import { ThemePreference } from '../../contexts/Storage/types'
import RadioButton from '../forms/RadioButton'
import ThemeModeExample from './examples/ThemeModeExample'
import { SettingsComponent } from './types'

const ThemeSetting: SettingsComponent<ThemePreference> = ({
  value: selectedTheme,
  onChange: setSelectedTheme,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none">
        <ThemeModeExample onClick={() => setSelectedTheme('light')} />
        <ThemeModeExample
          onClick={() => setSelectedTheme('dark')}
          variant={'dark'}
        />
      </div>
      <div className="grid grid-cols-3 px-3">
        <RadioButton
          selected={selectedTheme === 'light'}
          label={'בהיר'}
          onClick={() => setSelectedTheme('light')}
        />
        <RadioButton
          selected={selectedTheme === 'system'}
          label={'העדפות מערכת'}
          onClick={() => setSelectedTheme('system')}
        />
        <RadioButton
          selected={selectedTheme === 'dark'}
          label={'כהה'}
          onClick={() => setSelectedTheme('dark')}
        />
      </div>
    </div>
  )
}

export default ThemeSetting
