import { Icon } from '../../icons/svgFactory'

const ICON_SIZE = 24

export interface PageTitleIconProps {
  icon?: Icon
  onIconClick?(): unknown
}

export default function PageTitleIcon({
  icon: Icon,
  onIconClick,
}: PageTitleIconProps) {
  return Icon && onIconClick ? (
    <button onClick={onIconClick}>
      <Icon width={ICON_SIZE} height={ICON_SIZE} />
    </button>
  ) : (
    <div style={{ width: ICON_SIZE, height: ICON_SIZE }}></div>
  )
}
