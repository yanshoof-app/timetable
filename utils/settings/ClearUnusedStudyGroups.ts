import { IScheduleSettings } from '../../interfaces'

export default function clearUnusedStudyGroups(settings: IScheduleSettings) {
  const { studyGroups, studyGroupMap } = settings
  const studyGroupMapValues = new Set(studyGroupMap.values())
  let override = false

  for (let i = 0; i < studyGroups.length; i++) {
    //detect unused study group
    if (studyGroupMapValues.has(i)) continue

    //remove the unused study group
    studyGroups.splice(i, 1)

    //update indexes in studyGroupMap
    for (let key of studyGroupMap.keys()) {
      if (studyGroupMap.get(key) > i) {
        override = true
        studyGroupMap.set(key, studyGroupMap.get(key) - 1)
      }
    }
  }
  return override ? studyGroupMap : []
}
