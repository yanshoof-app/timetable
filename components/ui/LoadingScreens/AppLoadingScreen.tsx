import { Logo } from '../../icons'
import Layout from '../../Layout'

export default function AppLoadingScreen() {
  return (
    <Layout className="flex flex-col justify-center items-center py-4">
      <Logo className="w-64 h-auto" />
    </Layout>
  )
}
