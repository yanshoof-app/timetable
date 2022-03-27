import { useStorage } from '../../contexts/Storage'
import RadioButton from '../forms/RadioButton'
import Layout from '../Layout'
import ThemeModeExample from './examples/ThemeModeExample'

export default function ThemePreferencePick() {
  const { theme, setTheme } = useStorage()

  return theme ? (
    <Layout className="p-[1rem] flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none">
        <ThemeModeExample onClick={() => setTheme('light')} />
        <ThemeModeExample onClick={() => setTheme('dark')} variant={'dark'} />
      </div>
      <div className="flex justify-between px-12">
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
    </Layout>
  ) : null
}
