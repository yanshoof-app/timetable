import { useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { ThemePreference } from '../../contexts/Storage/types'
import RadioButton from '../forms/RadioButton'
import { BackRTL } from '../icons'
import Layout from '../Layout'
import PageTitle from '../ui/PageTitle'
import ThemeModeExample from './examples/ThemeModeExample'

export default function ThemePreferencePick() {
  const { setTheme } = useStorage()
  const [selectedTheme, setSelectedTheme] = useState(
    'system' as ThemePreference
  )

  return (
    <Layout className="px-4">
      <PageTitle
        title="מראה"
        startIcon={BackRTL}
        onStartIconClick={() => setTheme(selectedTheme)}
      />
      <div className="flex flex-col gap-2">
        <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none">
          <ThemeModeExample onClick={() => setSelectedTheme('light')} />
          <ThemeModeExample
            onClick={() => setSelectedTheme('dark')}
            variant={'dark'}
          />
        </div>
        <div className="flex justify-between px-12">
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
    </Layout>
  )
}
