import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import Timetable from '../components/timetable/Timetable'
import { useCallback, useState } from 'react'
import DayPick from '../components/forms/DayPick'
import useCurrentDay from '../hooks/useCurrentDay'
import useDate from '../hooks/useDate'
import Navbar from '../components/ui/Navbar'
import { useTimetableUpdates } from '../contexts/Updates'
import Toast from '../components/ui/Toast'
import { useDayFilterer } from '../hooks/useDayFilterer'
import { useStorage } from '../contexts/Storage'
import { GetStaticProps } from 'next'
import { buildTitleGetStaticProps } from '../components/DocumentHead'

const MY_SCHEDULE = 'המערכת שלי'

const IndexPage = () => {
  const { lessons } = useStorage()
  const { showToast, ...toastProps } = useTimetableUpdates()
  const dayFilterer = useDayFilterer(lessons)
  const { currentDay, date } = useCurrentDay(dayFilterer)
  const [day, updateDay] = useState(currentDay)
  const dateOfSelected = useDate(day, date.current)

  return (
    <Layout className="overflow-hidden flex flex-col pt-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 ">
        <DayDateView
          className="text-lg font-semibold"
          ofDate={dateOfSelected}
        />
        <DayPick
          day={day}
          onChange={(index) => updateDay(index)}
          className={'px-5 w-full'}
          dayFilterer={dayFilterer}
        />
      </div>
      <Timetable
        className="p-5 overflow-y-scroll mb-14"
        day={day}
        timetable={lessons}
      />
      {showToast && <Toast {...toastProps} />}
      <Navbar />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps =
  buildTitleGetStaticProps(MY_SCHEDULE)

export default IndexPage
