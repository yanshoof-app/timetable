import Layout from '../components/Layout'
import LessonsOfDay from '../components/settings/LessonsOfDay'
import Lesson from '../components/timetable/Lesson'
import LessonOption from '../components/timetable/LessonPick/LessonOption'
import LoadingScreen from '../components/ui/LoadingScreens'
import { ILesson, LessonModification } from '../interfaces'

const defaultLesson: ILesson = {
  class: 'מחשבים יב',
  subject: 'פרטני צמצום פערים ח תלמידים בחלון',
  teacher: 'מלך העולם קונסטנטין זבלינסקי',
  changes: [
    {
      modification: LessonModification.NewHour,
      modData: 'הנדסת תוכנה אפליקציות',
    },
  ],
}

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <LoadingScreen label="כיתות" />
    </Layout>
  )
}

export default IndexPage
