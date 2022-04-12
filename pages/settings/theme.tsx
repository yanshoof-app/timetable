import { useState } from 'react'
import RadioButton from '../../components/forms/RadioButton'
import ThemeModeExample from '../../components/settings/examples/ThemeModeExample'
import SettingsPageLayout from '../../components/settings/layout/SettingsPageLayout'
import { useStorage } from '../../contexts/Storage'
import useBackPress from '../../hooks/useBackPress'

export default function ThemePreferenceSetting() {
  const { back } = useBackPress('/settings')
  const { setTheme, theme } = useStorage()
  const [selectedTheme, setSelectedTheme] = useState(theme)
  return (
    <SettingsPageLayout
      title="מראה"
      onBackPress={() => {
        setTheme(selectedTheme)
        back()
      }}
    >
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
    </SettingsPageLayout>
  )
}
