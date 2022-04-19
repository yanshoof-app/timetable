import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import Timetable from '../components/timetable/Timetable'
import { useCallback, useState } from 'react'
import DayPick from '../components/forms/DayPick'
import useCurrentDay from '../hooks/useCurrentDay'
import useDate from '../hooks/useDate'
import Navbar from '../components/ui/Navbar'
import { useDayFilterer } from '../hooks/useDayFilterer'
import { useStorage } from '../contexts/Storage'
import { GetStaticProps } from 'next'
import { buildTitleGetStaticProps } from '../components/DocumentHead'
import useConfetti from '../hooks/useConfetti'
import { LessonModification } from '../interfaces'

const MY_SCHEDULE = 'המערכת שלי'

const IndexPage = () => {
  const { lessons } = useStorage()
  const dayFilterer = useDayFilterer(lessons)
  const { currentDay, date } = useCurrentDay(dayFilterer)
  const [day, updateDay] = useState(currentDay)
  const dateOfSelected = useDate(day, date.current)
  const celebrate = useConfetti(LessonModification.Canceled, day)

  return (
    <Layout className="overflow-hidden flex flex-col pt-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 ">
        <DayDateView
          className="text-lg font-semibold dark:text-gray-300"
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
      <Navbar />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps =
  buildTitleGetStaticProps(MY_SCHEDULE)

export default IndexPage
