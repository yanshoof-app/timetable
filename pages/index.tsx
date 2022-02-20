import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import { HourOfDay, LessonModification } from '../interfaces'
import Timetable from '../components/timetable/Timetable'
import { timetable_example } from '../timetable_sample'
import DropdownPick from '../components/forms/DropdownPick'

const defaultLesson = {
  class: 'מחשבים יב',
  subject: 'פרטי צמצום פערים ח תלמידים בחלון',
  teacher: 'קונסטנטין זבלינסקי',
  modification: LessonModification.Canceled,
  modData: 'קונסטנטין זבלינסקי',
  hour: 1 as HourOfDay,
}

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-2xl text-center">Hello Next.js 👋</h1>
    <ShadowedWrapper className="p-2 w-24 rounded-xl m-4">Hello</ShadowedWrapper>
    <Button>Click Me</Button>
    <Button variant="secondary">Click Me Too</Button>
    <br></br>
    <DropdownPick options={['אושרי', ' שכנר']}></DropdownPick>
    <Timetable day={0} timetable={timetable_example} />
    <DayDateView className="font-semibold m-4 text-xl" />
  </Layout>
)

export default IndexPage
