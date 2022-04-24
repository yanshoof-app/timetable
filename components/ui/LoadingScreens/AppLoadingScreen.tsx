import { Logo } from '../../icons'
import Layout from '../../Layout'

export default function AppLoadingScreen({
  transition: transition = false,
}: {
  transition?: boolean
}) {
  return (
    <div
      className={`flex flex-col justify-start items-center py-4 h-screen bg-primary-500 ${
        transition && 'animate-[fadeOut_0.25s_ease-out]'
      } z-50`}
    >
      <Layout className="flex flex-col justify-center items-center py-4 bg-primary-500 z-50">
        <Logo className="w-48 h-auto" />
      </Layout>
    </div>
  )
}
