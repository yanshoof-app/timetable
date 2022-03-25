import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import { DayOfWeek, HourOfDay, LessonModification } from '../interfaces'
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

const defaultLesson = {
  class: 'מחשבים יב',
  subject: 'פרטי צמצום פערים ח תלמידים בחלון',
  teacher: 'קונסטנטין זבלינסקי',
  modification: LessonModification.Canceled,
  modData: 'קונסטנטין זבלינסקי',
  hour: 1 as HourOfDay,
}

const MY_SCHEDULE = 'המערכת שלי'

const IndexPage = () => {
  const { currentDay, date } = useCurrentDay()
  const [day, updateDay] = useState(currentDay)
  const dateOfSelected = useDate(day, date.current)

  return (
    <Layout title={MY_SCHEDULE}>
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
      <Timetable className="p-[1rem]" day={day} timetable={timetable_example} />
      <div className="flex justify-center">
        <TimetableUpdatesToast />
      </div>
    </Layout>
  )
}

export default IndexPage
