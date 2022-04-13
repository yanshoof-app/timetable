import Link from 'next/link'
import Button from '../components/forms/Button'
import { Shahaf404 } from '../components/icons'
import Layout from '../components/Layout'

const _404Page = () => {
  return (
    <Layout
      title="העמוד לא נמצא"
      className="bg-gray-900 flex items-center justify-center flex-col gap-3 h-screen"
    >
      <div className="flex text-[90px] font-_404 font-[900] text-white gap-1">
        <Shahaf404 className="h-[70px] z-10"></Shahaf404>
      </div>
      <p className="text-white font-extrabold text-2xl">העמוד לא נמצא</p>
      <div>
        <Button className="m-2">
          <Link href={'/'}> לדף הבית</Link>
        </Button>
        <Button className="m-2" variant="secondary">
          <Link href={'/'}>למערכת שחף</Link>
        </Button>
      </div>
    </Layout>
  )
}

export default _404Page
