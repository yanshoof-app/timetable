import { useState } from 'react'
import useCurrentDay from '../../hooks/useCurrentDay'
import useDate from '../../hooks/useDate'
import DayPick from '../forms/DayPick'
import Layout from '../Layout'
import TimetableSkeleton from '../timetable/TimetableSkeleton'
import DayDateView from './DayDateView'

export default function LoadingScreen() {
  const { currentDay, date } = useCurrentDay()
  const [day, updateDay] = useState(currentDay)
  const dateOfSelected = useDate(day, date.current)

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <DayDateView
          className="text-lg font-semibold"
          ofDate={dateOfSelected}
        />
      </div>
      <DayPick
        day={day}
        onChange={(index) => updateDay(index)}
        className={'pr-[1rem] pl-[1rem]'}
      ></DayPick>
      <TimetableSkeleton className="p-[1rem]" />
    </Layout>
  )
}
