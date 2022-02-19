import { ReactNode } from 'react'
import { ColorMapper, ThemeColor } from '../theme'

const colorOptions: ColorMapper = (color: ThemeColor) =>
  ({
    event: 'shadow-event-600/70',
    change: 'shadow-change-500/70',
    celebration: 'shadow-celebration-500/70',
    primary: 'shadow-primary-500',
    gray: 'shadow-gray-500/30',
  }[color])

export interface ShadowedWrapperProps {
  color?: ThemeColor
  className?: string
  children: ReactNode | ReactNode[]
}

export default function ShadowedWrapper({
  color = 'gray',
  className = '',
  children,
}: ShadowedWrapperProps) {
  return (
    <div
      className={`shadow-theme bg-white -translate-x-2 ${colorOptions(
        color
      )} ${className}`}
    >
      {children}
    </div>
  )
}
