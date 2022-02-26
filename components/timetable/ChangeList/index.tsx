import {
  IModification,
  IStudyGroup,
  IStudyGroupWithModification,
} from '../../../interfaces'
import Change from './Change'

export default function ChangeList(changes: IStudyGroupWithModification[]) {
  return (
    <div>
      {changes.map((change, index) => (
        <Change
          subject={change.subject}
          teacher={change.teacher}
          key={index}
        ></Change>
      ))}
    </div>
  )
}
