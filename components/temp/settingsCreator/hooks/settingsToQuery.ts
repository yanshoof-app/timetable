import { IStudyGroup } from '../../../../interfaces'

export default function settingsToQuery({
  school,
  classId,
  studyGroups,
  studyGroupsMap,
  showOthersChanges = true,
}: {
  school: string
  classId: string
  studyGroups: string[]
  studyGroupsMap: Map<any, any>
  showOthersChanges?: boolean
}) {
  let studyGroupsArray = []
  let studyGroupsMapArray = []

  //collect study groups
  for (let studyGroup of studyGroups) {
    studyGroupsArray.push(`${studyGroup[0]}:${studyGroup[1]}`)
  }

  //collect study groups
  for (let index of studyGroupsMap) {
    const day = index[0][0]
    const hour = index[0][2]
    studyGroupsMapArray.push(`${day}/${hour}:${index[1]}`)
  }

  return `school=${school}&classId=${classId}&showOthersChanges=${showOthersChanges}&studyGroups=${studyGroupsArray.join()}&studyGroupMap=${studyGroupsMapArray.join()}`
}
