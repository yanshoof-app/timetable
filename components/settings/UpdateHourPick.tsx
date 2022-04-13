import { useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { HOURS } from '../../pages/settings'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { BackRTL, Edit } from '../icons'
import Layout from '../Layout'
import PageTitle from '../ui/PageTitle'
import { ISettingsPageProps } from './types'

const MIN_HOUR = 16 //Number(Object.keys(HOURS)[0])

export default function UpdateHourPick({ onBackPress }: ISettingsPageProps) {
  const { setUpdateTime, updateTime } = useStorage()
  const [selectedUpdateTimeIndex, selectUpdateTimeIndex] = useState(
    updateTime ? updateTime - MIN_HOUR : 8
  )
  const selectedUpdateTime = useMemo(
    () => selectedUpdateTimeIndex + MIN_HOUR,
    [selectedUpdateTimeIndex]
  )

  return (
    <Layout className="px-4 flex flex-col justify-between" title="מערכת של מחר">
      {onBackPress && (
        <PageTitle
          title="מערכת של מחר"
          startIcon={BackRTL}
          onStartIconClick={() => {
            setUpdateTime(selectedUpdateTime)
            onBackPress()
          }}
        />
      )}
      <div className="flex flex-col justify-center items-center gap-5 mb-[40vh]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-bold text-2xl w-8/12 text-center">
            מאיזו שעה תרצו שתוצג המערכת הבאה?
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <DropdownPick
            options={Object.values(HOURS)}
            onIndexChange={(selectedHour) => {
              selectUpdateTimeIndex(selectedHour)
            }}
            indexOfValue={selectedUpdateTimeIndex}
          />
          {!onBackPress && (
            <Button
              className="mx-0 my-0 h-full w-20"
              onClick={() => setUpdateTime(selectedUpdateTime)}
            >
              סיום
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}
