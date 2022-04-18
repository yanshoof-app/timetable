import { ColorMapper, ThemeColor } from '../theme'
import { Wrapper } from '../types'

const colorOptions: ColorMapper = (color: ThemeColor) =>
  ({
    event: 'shadow-event-600/70',
    change: 'shadow-change-500/70',
    celebration: 'shadow-celebration-500/70',
    primary: 'shadow-primary-500',
    gray: 'shadow-gray-500/30 dark:shadow-gray-400/80',
  }[color])

export interface ShadowedWrapperProps {
  color?: ThemeColor
  className?: string
}

export default function ShadowedWrapper({
  color = 'gray',
  className = '',
  children,
}: ShadowedWrapperProps & Wrapper) {
  return (
    <div
      className={` shadow-theme bg-white -translate-x-[2px] ${colorOptions(
        color
      )} ${className}`}
    >
      {children}
    </div>
  )
}
