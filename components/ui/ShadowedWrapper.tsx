import { ColorMapper, ThemeColor } from '../theme'
import { Wrapper } from '../types'

const colorOptions: ColorMapper = (color: ThemeColor) =>
  ({
    event: 'shadow-event-600/70 dark:shadow-event-600/40',
    change: 'shadow-change-500/70 dark:shadow-change-600/40',
    celebration: 'shadow-celebration-500/70 dark:shadow-celebration-600/70',
    primary: 'shadow-primary-500 dark:shadow-primary-600/70',
    gray: 'shadow-gray-500/30 dark:shadow-gray-600/30',
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
      className={` shadow-theme bg-white dark:bg-slate-900 dark:text-gray-300 -translate-x-[2px] ${colorOptions(
        color
      )} ${className}`}
    >
      {children}
    </div>
  )
}
