import Layout from '../../Layout'
import Spinner from './Spinner'

const LOADING = 'טוען'

export default function LoadingScreen({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <Layout
      className={`flex justify-center flex-col items-center gap-3 ${className}`}
    >
      <Spinner className="w-16 h-16 fill-primary-500" />
      <p className="font-semibold dark:text-gray-300">{`${LOADING} ${label}...`}</p>
    </Layout>
  )
}
