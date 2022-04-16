import { Logo } from '../../icons'
import Layout from '../../Layout'

type fade = 'in' | 'out'

export default function AppLoadingScreen({ fade = 'in' }: { fade?: fade }) {
  return (
    <Layout
      className={`flex flex-col justify-center items-center py-4 bg-gray-100 ${
        fade === 'in' ? '' : 'animate-[fadeOut_0.5s_ease-out]'
      } z-50`}
    >
      <Logo className="w-48 h-auto" />
    </Layout>
  )
}
