export interface ToastProps {
  Icon(): JSX.Element
  content: string
  actionContent?: string
  onClick?(): unknown
  hide?: boolean
}

export default function Toast({
  Icon,
  onClick,
  content,
  actionContent = '',
  hide = false,
}: ToastProps) {
  return (
    <div className="flex justify-between pr-5 pl-5 items-center absolute bg-slate-900 w-[calc(100%-2rem)] h-[3.5rem] bottom-[1rem] rounded-[10px] z-10">
      <div className="flex items-center text-white font-medium gap-3">
        <div className="w-6 h-6 fill-lime-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>{' '}
        </div>
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
