import { ForwardRTL } from '../../icons'
import { ThemeColor } from '../../theme'
import ShadowedWrapper from '../../ui/ShadowedWrapper'

export interface SettingsBoxProps {
  color: ThemeColor
  label: string
  value: string
  onClick?(): unknown
  className?: string
}

export default function SettingsBox({
  color,
  label,
  value,
  onClick = () => {},
  className = '',
}: SettingsBoxProps) {
  return (
    <ShadowedWrapper
      color={color}
      className={`rounded-xl px-2 py-4 cursor-pointer ${className}`}
    >
      <div className="inset-0 flex flex-col space-y-1" onClick={onClick}>
        <p className="font-semibold">{label}</p>
        <div className="flex justify-end text-left items-center text-gray-600">
          <p className="truncate font-semibold">{value}</p>
          <div>
            <ForwardRTL width={14} height={14} />
          </div>
        </div>
      </div>
    </ShadowedWrapper>
  )
}
