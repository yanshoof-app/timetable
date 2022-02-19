import Button from '../components/forms/Button'
import Layout from '../components/Layout'
import Lesson from '../components/timetable/Lesson'
import LessonInfo from '../components/timetable/LessonInfo'
import ShadowedWrapper from '../components/ui/ShadowedWrapper'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-2xl text-center">Hello Next.js 👋</h1>
    <ShadowedWrapper className="p-2 w-24 rounded-xl m-4">Hello</ShadowedWrapper>
    <Button>Click Me</Button>
    <Button variant="secondary">Click Me Too</Button>
    <br></br>
    <div className="w-[90%]">
      <Lesson
        info={{
          class: 'מחשבים יב',
          subject: 'פרטי צמצום פערים ח תלמידים בחלון',
          teacher: 'קונסטנטין זבלינסקי',
          modification: 1,
        }}
        hour={1}
      />
    </div>
  </Layout>
)

export default IndexPage
