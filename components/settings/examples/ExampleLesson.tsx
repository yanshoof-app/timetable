import { Variant } from './ThemeModeExample'
import { HourOfDay } from '../../../interfaces'
import ShadowedWrapper from '../../ui/ShadowedWrapper'
import { resize } from './ThemeModeExample'

const variants = {
  light: '',
  dark: 'bg-slate-900 shadow-slate-800/80',
}

export type LessonVariant = keyof typeof variants

export default function ExampleLesson({
  hour,
  variant = 'light',
}: {
  hour: number
  variant?: LessonVariant
}) {
  return (
    <div className="flex flex-col">
      <ShadowedWrapper
        color={'gray'}
        className={`flex flex-row rounded-[4.8px] p-[0.4rem] shadow-example ${variants[variant]} -translate-x-[1px]`}
      >
        <p className="font-hour font-bold text-[12px] text-gray-500">{hour}</p>
      </ShadowedWrapper>
    </div>
  )
}
