import { useState } from 'react'
import useCurrentDay from '../../../hooks/useCurrentDay'
import useDate from '../../../hooks/useDate'
import DayPick from '../../forms/DayPick'
import Layout from '../../Layout'
import TimetableSkeleton from '../../timetable/TimetableSkeleton'
import DayDateView from '../DayDateView'

export default function TimetableLoadingScreen() {
  const { currentDay, date } = useCurrentDay()
  const [day, updateDay] = useState(currentDay)
  const dateOfSelected = useDate(day, date.current)

  return (
    <Layout className="flex flex-col py-4">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <DayDateView
          className="text-lg font-semibold"
          ofDate={dateOfSelected}
        />
        <DayPick
          day={day}
          onChange={(index) => updateDay(index)}
          className={'px-5 w-full'}
        ></DayPick>
      </div>
      <TimetableSkeleton className="p-5 mb-10" />
    </Layout>
  )
}
