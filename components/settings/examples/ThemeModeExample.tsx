import { HourOfDay } from '../../../interfaces'
import Lesson from '../../timetable/Lesson'
import ExampleLesson, { LessonVariant } from './ExampleLesson'

export type Variant = 'light' | 'dark'

const variants = {
  light: 'bg-[#F3F4F6]',
  dark: 'bg-[#05080F]',
}

export const resize = '0.4'
export default function ThemeModeExample({
  className = '',
  onClick = () => {},
  variant = 'light',
}: {
  className?: string
  onClick?(): unknown
  variant?: LessonVariant
}) {
  const hours = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div
      className={`flex flex-col gap-[0.6rem] p-[0.6rem] rounded-[14.4px] w-full ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {hours.map((hour) => (
        <ExampleLesson hour={hour} key={hour} variant={variant}></ExampleLesson>
      ))}
    </div>
  )
}
