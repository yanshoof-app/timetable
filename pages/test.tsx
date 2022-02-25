import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import { DayOfWeek, HourOfDay, LessonModification } from '../interfaces'
import Timetable from '../components/timetable/Timetable'
import {
  fulltimetable_example,
  options_example,
  timetable_example,
} from '../timetable_sample'
import DropdownPick from '../components/forms/DropdownPick'
import { useState } from 'react'
import Toast from '../components/ui/Toast'
import PageTitle from '../components/ui/PageTitle'
import DayPick from '../components/forms/DayPick'
import Input from '../components/forms/Input'
import { Calendar, Done } from '../components/icons'
import RadioButton from '../components/forms/RadioButton'
import AdvancedEditingLink from '../components/settings/AdvancedEditingLink'
import NavLink from '../components/ui/Navbar/NavLink'
import LessonPick from '../components/timetable/Lesson/LessonPick'

const defaultLesson = {
  class: 'מחשבים יב',
  subject: 'פרטי צמצום פערים ח תלמידים בחלון',
  teacher: 'קונסטנטין זבלינסקי',
  hour: 1 as HourOfDay,
}

const IndexPage = () => {
  const [date, updateDay] = useState(2 as DayOfWeek)
  const [toast, showToast] = useState(true)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <PageTitle
        title="Hello World"
        startIcon={Done}
        onStartIconClick={() => console.log('click!')}
      />
      <Timetable
        day={0}
        timetable={fulltimetable_example}
        allEditable
        className="p-[1rem]"
      ></Timetable>
    </Layout>
  )
}

export default IndexPage
