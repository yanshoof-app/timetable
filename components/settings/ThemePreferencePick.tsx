import { useState } from 'react'
import { ThemePreference } from '../../contexts/Storage/types'
import RadioButton from '../forms/RadioButton'
import ThemeModeExample from './examples/ThemeModeExample'

export default function ThemePreferencePick(themePreference: ThemePreference) {
  const [picked, setPicked] = useState(themePreference)

  return (
    <div className="p-[1rem] flex flex-col gap-2">
      <div className="bg-uiPrimary-200 flex flex-row justify-between p-3 rounded-[26.4px] gap-3 select-none">
        <ThemeModeExample onClick={() => setPicked('light')} />
        <ThemeModeExample onClick={() => setPicked('dark')} variant={'dark'} />
      </div>
      <div className="flex justify-between px-8 ">
        <RadioButton
          selected={picked === 'light'}
          label={'בהיר'}
          orientation={'horizontal'}
          onClick={() => setPicked('light')}
        />
        <RadioButton
          selected={picked === 'system'}
          label={'העדפות מערכת'}
          orientation={'horizontal'}
          onClick={() => setPicked('system')}
        />

        <RadioButton
          selected={picked === 'dark'}
          label={'כהה'}
          orientation={'horizontal'}
          onClick={() => setPicked('dark')}
        />
      </div>
    </div>
  )
}
