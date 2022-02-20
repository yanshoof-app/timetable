import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import Lesson from '../components/timetable/Lesson'
import LessonInfo from '../components/timetable/LessonInfo'
import DayDateView from '../components/ui/DayDateView'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'
import { HourOfDay, LessonModification } from '../interfaces'

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
    <div className="w-[90%]">
      <Lesson {...defaultLesson} />
    </div>
    <DayDateView className="font-semibold m-4 text-xl" />
  </Layout>
)

export default IndexPage
