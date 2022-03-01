import ExampleLesson from './ExampleLesson'

export type Variant = 'show' | 'hide'

export default function OthersChangesExample({
  className = '',
  onClick = () => {},
  variant = 'hide',
}: {
  className?: string
  onClick?(): unknown
  variant?: Variant
}) {
  const hours = [false, true, false, false, true, true, false]
  return (
    <div
      className={`flex flex-col bg-[#F3F4F6] gap-[0.6rem] p-[0.6rem] rounded-[14.4px] w-full ${className} overflow-hidden`}
      onClick={onClick}
    >
      {hours.map((showOthersChanges, hour) => (
        <ExampleLesson
          hour={hour}
          key={hour}
          variant={
            showOthersChanges && variant === 'show' ? 'othersChanges' : 'light'
          }
        ></ExampleLesson>
      ))}
    </div>
  )
}
