import ShadowedWrapper from '../../ui/ShadowedWrapper'

const variants = {
  light: '',
  dark: 'bg-slate-900 shadow-slate-800/80',
  othersChanges: '',
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
    <div className="flex flex-col gap-3">
      <ShadowedWrapper
        color={'gray'}
        className={`flex flex-row rounded-[4.8px] p-[0.4rem] shadow-example ${variants[variant]} -translate-x-[1px]`}
      >
        <p className="font-hour font-bold text-[12px] text-gray-500">{hour}</p>
      </ShadowedWrapper>
      {variant === 'othersChanges' && (
        <div className="w-full h-2 bg-[#D9D9D9]"></div>
      )}
    </div>
  )
}
