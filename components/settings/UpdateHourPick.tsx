import { useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { HOURS } from '../../pages/settings'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { Edit } from '../icons'

export default function UpdateHourPick() {
  const { updateTime, setUpdateTime } = useStorage()

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-5">
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="font-bold text-2xl w-8/12 text-center">
          מאיזו שעה תרצו שתוצג המערכת הבאה?
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <DropdownPick
          options={Object.values(HOURS)}
          onChange={(selectedHour) => {
            setUpdateTime(selectedHour)
          }}
          defaultIndex={updateTime}
        ></DropdownPick>
        <Button className="m-0 w-20">הבא</Button>
      </div>
    </div>
  )
}
