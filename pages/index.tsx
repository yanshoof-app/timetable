import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import {
  DayOfWeek,
  HourOfDay,
  isILessonObj,
  LessonModification,
} from '../interfaces'
import Timetable from '../components/timetable/Timetable'
import { timetable_example } from '../timetable_sample'
import DropdownPick from '../components/forms/DropdownPick'
import { useMemo, useState } from 'react'
import Toast from '../components/ui/Toast/Toast'
import PageTitle from '../components/ui/PageTitle'
import DayPick from '../components/forms/DayPick'
import Input from '../components/forms/Input'
import { Calendar, Done } from '../components/icons'
import RadioButton from '../components/forms/RadioButton'
import AdvancedEditingLink from '../components/settings/AdvancedEditingLink'
import NavLink from '../components/ui/Navbar/NavLink'
import useCurrentDay from '../hooks/useCurrentDay'
import useDate from '../hooks/useDate'
import TimetableUpdatesToast from '../components/ui/Toast'
import { useTimetable } from '../contexts/Timetable'
import Navbar from '../components/ui/Navbar'

const MY_SCHEDULE = 'המערכת שלי'

const IndexPage = () => {
  const { currentDay, date } = useCurrentDay()
  const [day, updateDay] = useState(currentDay)
  const dateOfSelected = useDate(day, date.current)
  const { lessons } = useTimetable()

  return (
    <Layout title={MY_SCHEDULE} className="overflow-hidden flex flex-col pt-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 ">
        <DayDateView
          className="text-lg font-semibold"
          ofDate={dateOfSelected}
        />
        <DayPick
          day={day}
          onChange={(index) => updateDay(index)}
          className={'px-5 w-full'}
          dayFilterer={(_dayName, index) => lessons[index].some(isILessonObj)}
        />
      </div>
      <Timetable
        className="p-5 overflow-y-scroll mb-14"
        day={day}
        timetable={lessons}
      />
      <TimetableUpdatesToast />
      <Navbar></Navbar>
    </Layout>
  )
}

export default IndexPage
