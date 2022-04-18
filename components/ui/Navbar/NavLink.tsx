import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactChild, useMemo } from 'react'
import { Icon } from '../../icons/svgFactory'

const ICON_SIZE = 28

export interface NavLinkProps {
  icon: Icon
  label: string
  to: string
  update?: ReactChild
}

export default function NavLink({
  icon: Icon,
  label,
  to,
  update = '',
}: NavLinkProps) {
  const router = useRouter()
  const active = useMemo(() => router.pathname == to, [router.pathname, to])
  return (
    <Link href={to} passHref>
      <div
        className={`flex flex-col items-center justify-center cursor-pointer ${
          active ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <Icon width={ICON_SIZE} height={ICON_SIZE} />
        {update && (
          <div
            className={`absolute mb-2 ml-5 w-5 h-5 bg-primary-500 rounded-full flex justify-center items-center`}
          >
            <p className="text-white text-xs">{update}</p>
          </div>
        )}
        <span className="text-sm font-semibold">{label}</span>
      </div>
    </Link>
  )
}
