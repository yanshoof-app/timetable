import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Icon } from '../../icons/svgFactory'

export interface ToastProps {
  icon: Icon
  iconClassName?: string
  content: string
  actionContent?: string
  onClick?(): unknown
  hide?: boolean
  showToast(boolean): unknown
}

export default function Toast({
  icon: Icon,
  iconClassName,
  onClick = () => {},
  content,
  actionContent = '',
  showToast,
}: ToastProps) {
  const controls = useAnimation()

  const ToastOut = async () => {
    controls
      .start({
        y: '8.25rem',
        transition: { ease: 'easeOut', duration: '0.3' },
      })
      .then(() => {
        showToast(false)
      })
  }

  const [toastPos, updateToastPos] = useState({} as MouseEvent | PointerEvent)

  const isDraggedDown = (newPos) => {
    if (newPos.screenY > toastPos.screenY) return true
    return false
  }

  return (
    <div className="flex w-full justify-center fixed z-20 bottom-0">
      <motion.div
        className="flex justify-between pr-5 animate-[toastin_0.5s_ease-out] pl-5 items-center relative bg-slate-900 w-[calc(100%-2rem)] h-[3.5rem] bottom-[4.75rem] rounded-[10px]"
        drag="y"
        dragConstraints={{ top: 0, bottom: 20 }}
        onDragStart={(e) => {
          updateToastPos(e as MouseEvent | PointerEvent)
        }}
        onDragEnd={(e) => {
          if (isDraggedDown(e)) ToastOut()
        }}
        dragElastic={0.5}
        animate={controls}
      >
        <div className="flex items-center text-white font-medium gap-3">
          <Icon width={24} className={iconClassName} />
          <p>{content}</p>
        </div>
        {actionContent && (
          <div className="text-primary-500 font-bold">
            <button className="font-bold" onClick={onClick}>
              {actionContent}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
