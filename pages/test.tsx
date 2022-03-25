import Layout from '../components/Layout'
import Lesson from '../components/timetable/Lesson'
import LessonOption from '../components/timetable/LessonPick/LessonOption'
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
      <div className="p-4">
        <Lesson lesson={defaultLesson} hour={1} />
        <LessonOption
          option={defaultLesson}
          index={1}
          setPicked={() => {}}
          multipleHour={false}
        />
      </div>
    </Layout>
  )
}

export default IndexPage
