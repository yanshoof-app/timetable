import { changeTextColor } from '../Lesson'

export default function Event({ event }: { event: string }) {
  return (
    <p className=" truncate">
      <span className={`${changeTextColor('event')} font-bold`}>{event}</span>
    </p>
  )
}
