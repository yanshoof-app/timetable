import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Icon } from '../../icons/svgFactory'

export interface ToastProps {
  icon: Icon
  iconClassName?: string
  content: string
  actionContent?: string
  onClick?(): unknown
  setToastVisible(boolean): unknown
}

export default function Toast({
  icon: Icon,
  iconClassName,
  onClick = () => {},
  content,
  actionContent = '',
  setToastVisible,
}: ToastProps) {
  const controls = useAnimation()

  const ToastOut = async () => {
    controls
      .start({
        y: '8.25rem',
        transition: { ease: 'easeOut', duration: '0.3' },
      })
      .then(() => {
        setToastVisible(false)
      })
  }

  const ToastFadeOut = async () => {
    controls
      .start({
        opacity: 0,
        transition: { ease: 'easeOut', duration: '0.2' },
      })
      .then(() => {
        setToastVisible(false)
      })
  }

  const [toastPos, updateToastPos] = useState({} as MouseEvent | PointerEvent)

  const isDraggedDown = (newPos) => {
    return newPos.screenY > toastPos.screenY
  }

  return (
    <motion.div
      className="flex justify-between pr-5 animate-[toastin_0.5s_ease-out] pl-5 items-center fixed z-20 bg-slate-900 dark:bg-primary-500 w-[calc(100%-2rem)] h-[3.5rem] bottom-[4.75rem] rounded-[10px] inset-x-0 mx-auto"
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
        <div className="text-primary-500 dark:text-white font-bold">
          <button
            className="font-bold"
            onClick={() => {
              onClick()
              ToastFadeOut()
            }}
          >
            {actionContent}
          </button>
        </div>
      )}
    </motion.div>
  )
}
