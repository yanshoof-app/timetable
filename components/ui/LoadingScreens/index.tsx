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
      <Spinner />
      <p className="font-semibold">{`${LOADING} ${label}...`}</p>
    </Layout>
  )
}
