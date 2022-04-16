import { Logo } from '../../icons'
import Layout from '../../Layout'

export default function AppLoadingScreen() {
  return (
    <Layout className="flex flex-col justify-center items-center py-4 animate-[fadeIn_0.5s_ease-out] z-50">
      <Logo className="w-48 h-auto" />
    </Layout>
  )
}
