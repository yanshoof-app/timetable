import { IStudyGroup } from '../../../../interfaces'

export default function TempStudyGroup(studyGroup: IStudyGroup) {
  return (
    <div className="flex flex-col">
      <p className="font-bold">{studyGroup.subject}</p>
      <p>{studyGroup.teacher}</p>
    </div>
  )
}
