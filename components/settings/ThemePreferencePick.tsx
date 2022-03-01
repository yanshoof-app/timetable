import { useState } from 'react'
import { useThemePreference } from '../../contexts/Storage/localStorage'
import { ThemePreference } from '../../contexts/Storage/types'
import RadioButton from '../forms/RadioButton'
import ThemeModeExample from './examples/ThemeModeExample'

export default function ThemePreferencePick() {
  const [theme, setTheme] = useThemePreference()
  const [picked, setPicked] = useState(theme)

  return (
    <div className="p-[1rem] flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none">
        <ThemeModeExample onClick={() => setTheme('light')} />
        <ThemeModeExample onClick={() => setTheme('dark')} variant={'dark'} />
      </div>
      <div className="flex justify-between px-8 ">
        <RadioButton
          selected={theme === 'light'}
          label={'בהיר'}
          onClick={() => setTheme('light')}
        />
        <RadioButton
          selected={theme === 'system'}
          label={'העדפות מערכת'}
          onClick={() => setTheme('system')}
        />

        <RadioButton
          selected={theme === 'dark'}
          label={'כהה'}
          onClick={() => setTheme('dark')}
        />
      </div>
    </div>
  )
}
