import { Icon } from '../../icons/svgFactory'
import PageTitleIcon from './PageTitleIcon'

export interface PageTitleProps {
  title: string
  startIcon?: Icon
  onStartIconClick?(): unknown
  endIcon?: Icon
  onEndIconClick?(): unknown
  orientation?: 'justify-start' | 'justify-between'
}

export default function PageTitle({
  title,
  startIcon,
  onStartIconClick,
  endIcon,
  onEndIconClick,
  orientation = 'justify-between',
}: PageTitleProps) {
  return (
    <div className={`flex flex-row h-14 ${orientation} items-center px-4`}>
      <PageTitleIcon icon={startIcon} onIconClick={onStartIconClick} />
      <h1 className="font-bold text-lg">{title}</h1>
      <PageTitleIcon icon={endIcon} onIconClick={onEndIconClick} />
    </div>
  )
}
