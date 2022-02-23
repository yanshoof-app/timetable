import { Icon } from '../icons/svgFactory'

export interface ToastProps {
  icon: Icon
  iconClassName?: string
  content: string
  actionContent?: string
  onClick?(): unknown
  hide?: boolean
}

export default function Toast({
  icon: Icon,
  iconClassName,
  onClick = () => {},
  content,
  actionContent = '',
  hide = false,
}: ToastProps) {
  return (
    <div className="flex justify-between pr-5 pl-5 items-center absolute bg-slate-900 w-[calc(100%-2rem)] h-[3.5rem] bottom-[1rem] rounded-[10px] z-10">
      <div className="flex items-center text-white font-medium gap-3">
        <Icon className={iconClassName} />
        <p>{content}</p>
      </div>
      {actionContent && (
        <div className="text-primary-500 font-bold">
          <button className="font-bold" onClick={onClick}>
            {actionContent}
          </button>
        </div>
      )}
    </div>
  )
}
