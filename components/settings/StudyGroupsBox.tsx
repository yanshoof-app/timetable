import { IStudyGroup } from '../../interfaces'
import ShadowedWrapper from '../ui/ShadowedWrapper'

export default function StudyGroupsBox({
  studyGroups,
}: {
  studyGroups: IStudyGroup[]
}) {
  return (
    <ShadowedWrapper>
      {studyGroups.map((studyGroup, index) => (
        <p key={index}>{studyGroup.subject}</p>
      ))}
    </ShadowedWrapper>
  )
}
