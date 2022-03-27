import { useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { HOURS } from '../../pages/settings'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { Edit } from '../icons'
import Layout from '../Layout'

export default function UpdateHourPick() {
  const { updateTime, setUpdateTime } = useStorage()
  const [tempUpdateTime, setTempUpdateTime] = useState(8)

  return (
    <Layout className="flex flex-col justify-center h-screen overflow-hidden items-center -mt-20 gap-5">
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-bold text-2xl w-8/12 text-center">
            מאיזו שעה תרצו שתוצג המערכת הבאה?
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <DropdownPick
            options={Object.values(HOURS)}
            onChange={(selectedHour) => {
              setTempUpdateTime(selectedHour)
            }}
            defaultIndex={tempUpdateTime}
          ></DropdownPick>
          <Button
            className="mx-0 my-0 h-full w-20"
            onClick={() => setUpdateTime(tempUpdateTime)}
          >
            סיום
          </Button>
        </div>
      </div>
    </Layout>
  )
}
