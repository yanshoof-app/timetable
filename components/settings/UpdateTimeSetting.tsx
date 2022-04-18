import { useCallback, useEffect, useMemo } from 'react'
import { HOURS } from '../../pages/settings'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { SettingsComponent } from './types'

const MIN_HOUR = 16 //Number(Object.keys(HOURS)[0])
const DEFAULT_OPTION = 8 // 24 - 16

export interface IUpdateTimeSettingProps {
  isEditing?: boolean
}

const UpdateTimeSetting: SettingsComponent<number, IUpdateTimeSettingProps> = ({
  value,
  onChange,
  save,
  isEditing = false,
}) => {
  const selectedIndex = useMemo(
    () => (value ? value - MIN_HOUR : DEFAULT_OPTION),
    [value]
  )
  const onIndexChange = useCallback(
    (idx) => {
      onChange(idx + MIN_HOUR)
    },
    [onChange]
  )

  // set initial state to default pick if not existing
  useEffect(() => {
    if (!value) onIndexChange(DEFAULT_OPTION)
  }, [value, onIndexChange])

  return (
    <div className="flex flex-col justify-center items-center gap-5 dark:text-gray-300">
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="font-bold text-2xl w-8/12 text-center">
          מאיזו שעה תרצו שתוצג המערכת הבאה?
        </p>
      </div>
      <div className="flex gap-4 items-stretch justify-center">
        <DropdownPick
          options={Object.values(HOURS)}
          onIndexChange={onIndexChange}
          indexOfValue={selectedIndex}
        />
        {!isEditing && (
          <Button className="py-4 w-20" onClick={save}>
            סיום
          </Button>
        )}
      </div>
    </div>
  )
}

export default UpdateTimeSetting
