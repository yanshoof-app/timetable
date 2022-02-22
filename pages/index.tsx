import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import { DayOfWeek, HourOfDay, LessonModification } from '../interfaces'
import Timetable from '../components/timetable/Timetable'
import { timetable_example } from '../timetable_sample'
import DropdownPick from '../components/forms/DropdownPick'
import { useState } from 'react'
import Toast from '../components/ui/Toast'
import DayPick from '../components/forms/DayPick'

const defaultLesson = {
  class: 'מחשבים יב',
  subject: 'פרטי צמצום פערים ח תלמידים בחלון',
  teacher: 'קונסטנטין זבלינסקי',
  modification: LessonModification.Canceled,
  modData: 'קונסטנטין זבלינסקי',
  hour: 1 as HourOfDay,
}

const IndexPage = () => {
  const [date, updateDay] = useState(2 as DayOfWeek)
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex justify-center">
        {' '}
        <Toast
          Icon={() => Button({ children: 'אבגד' })}
          content="הכל מעודכן"
        ></Toast>
      </div>
      {/*<h1 className="text-2xl text-center">Hello Next.js 👋</h1>
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
      <DayDateView className="font-semibold m-4 text-xl" />
      */}
      <DropdownPick
        options={['1', '2', '3', '4', '5', '6']}
        defaultIndex={1}
        className="w-[4rem]"
        onChange={(selectedIndex) => {
          updateDay(selectedIndex)
        }}
      ></DropdownPick>

      <div className="w-full flex justify-center">
        <DayDateView className="font-semibold"></DayDateView>
      </div>
      <DayPick
        day={date}
        value={date}
        onChange={(index) => updateDay(index)}
        className={'pr-[1rem] pl-[1rem]'}
      ></DayPick>
      <Timetable
        className="p-[1rem]"
        day={date}
        timetable={timetable_example}
      />
    </Layout>
  )
}

export default IndexPage
