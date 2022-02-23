import { motion, useAnimation, useDragControls } from 'framer-motion'
import { useEffect } from 'react'
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
  const controls = useAnimation()

  const ToastOut = () => {
    controls.start({
      y: '4.5rem',
      transition: { ease: 'easeOut', duration: '0.3' },
    })
  }

  const ToastIn = async () => {
    controls.set({
      y: '4.5rem',
    })
    controls.set({
      y: '0rem',
      transition: { ease: 'easeOut', duration: '0.3' },
    })
  }

  useEffect(() => {}, [])
  return (
    <motion.div
      className="flex justify-between pr-5 animate-[toastin_0.4s_ease-out] pl-5 items-center fixed bg-slate-900 w-[calc(100%-2rem)] h-[3.5rem] bottom-[1rem] rounded-[10px] z-10"
      drag="y"
      dragConstraints={{ top: 0, bottom: 500 }}
      onDragEnd={() => {
        ToastOut()
      }}
      dragElastic={0.5}
      animate={controls}
    >
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
    </motion.div>
  )
}
