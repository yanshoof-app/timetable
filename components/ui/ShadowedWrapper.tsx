import { ReactNode } from 'react'

const colorOptions = {
  red: 'shadow-rose-600/70',
  orange: 'shadow-amber-500/70',
  green: 'shadow-lime-500/70',
  primary: 'shadow-sky-500',
  default: 'shadow-gray-500/30',
}

export type ShadowColor = keyof typeof colorOptions

export interface ShadowedWrapperProps {
  color?: ShadowColor
  className?: string
  children: ReactNode | ReactNode[]
}

export default function ShadowedWrapper({
  color = 'default',
  className = '',
  children,
}: ShadowedWrapperProps) {
  return (
    <div
      className={`shadow-theme bg-white -translate-x-2 ${colorOptions[color]} ${className}`}
    >
      {children}
    </div>
  )
}
