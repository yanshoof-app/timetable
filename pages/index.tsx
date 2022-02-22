import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import { DayOfWeek, HourOfDay, LessonModification } from '../interfaces'
import Timetable from '../components/timetable/Timetable'
import { timetable_example } from '../timetable_sample'
import DropdownPick from '../components/forms/DropdownPick'
import { useState } from 'react'

const defaultLesson = {
  class: 'מחשבים יב',
  subject: 'פרטי צמצום פערים ח תלמידים בחלון',
  teacher: 'קונסטנטין זבלינסקי',
  modification: LessonModification.Canceled,
  modData: 'קונסטנטין זבלינסקי',
  hour: 1 as HourOfDay,
}

const IndexPage = () => {
  const [date, changeDate] = useState(1)
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      *<h1 className="text-2xl text-center">Hello Next.js 👋</h1>
      <ShadowedWrapper className="p-2 w-24 rounded-xl m-4">
        Hello
      </ShadowedWrapper>
      <Button>Click Me</Button>
      <Button variant="secondary">Click Me Too</Button>
      <br></br>
      <DropdownPick
        options={['1', '2', '3', '4', '5', '6']}
        defaultIndex={1}
        className="w-[4rem]"
        onChange={(selectedIndex) => {
          changeDate(selectedIndex)
        }}
      ></DropdownPick>
      <Timetable day={date as DayOfWeek} timetable={timetable_example} />
      <DayDateView className="font-semibold m-4 text-xl" />
    </Layout>
  )
}

export default IndexPage
