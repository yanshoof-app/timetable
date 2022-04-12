import { useMemo } from 'react'
import { HOURS } from '../../pages/settings'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { SettingsComponent } from './types'

const MIN_HOUR = 16 //Number(Object.keys(HOURS)[0])
const DEFAULT_OPTION = 8 // 24 - 16

const UpdateTimeSetting: SettingsComponent<number> = ({
  value,
  onChange,
  save,
}) => {
  const selectedIndex = useMemo(
    () => (value ? value - MIN_HOUR : DEFAULT_OPTION),
    [value]
  )
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="font-bold text-2xl w-8/12 text-center">
          מאיזו שעה תרצו שתוצג המערכת הבאה?
        </p>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <DropdownPick
          options={Object.values(HOURS)}
          onChange={onChange}
          defaultIndex={selectedIndex}
        />
        <Button className="mx-0 my-0 h-full w-20" onClick={save}>
          סיום
        </Button>
      </div>
    </div>
  )
}

export default UpdateTimeSetting
