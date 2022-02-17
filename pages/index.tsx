import Button from "../components/forms/Button";
import Layout from "../components/Layout";
import LessonInfo from "../components/timetable/LessonInfo";
import ShadowedWrapper from "../components/ui/ShadowedWrapper";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-2xl text-center">Hello Next.js 👋</h1>
    <ShadowedWrapper className="p-2 w-24 rounded-xl m-4">Hello</ShadowedWrapper>
    <Button>Click Me</Button>
    <Button variant="secondary">Click Me Too</Button>
    <br></br>
    <LessonInfo
      lesson={"פרטני צמצום פערים ח תלמידים בחלון"}
      teacher={"גדסי פריד אורנית"}
      room={"ספרייה"}
      newLesson={"תנך תנך"}
      newTeacher={"קונסטנטין זבלינסקי"}
      newRoom={"ח מחשבים"}
    ></LessonInfo>
  </Layout>
);

export default IndexPage;
