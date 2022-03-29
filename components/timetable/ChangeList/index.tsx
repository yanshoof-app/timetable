import { IStudyGroupWithModification } from '../../../interfaces'
import Change from './Change'
import Event from './Event'

export default function ChangeList({
  changes,
  events,
}: {
  changes: IStudyGroupWithModification[]
  events: string[]
}) {
  return (
    <div className="flex flex-col px-3 gap-2">
      {events.map((event, index) => (
        <Event event={event} key={index}></Event>
      ))}

      {changes.map((change, index) => (
        <Change {...change} key={index}></Change>
      ))}
    </div>
  )
}
