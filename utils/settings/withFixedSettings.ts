import { IScheduleSettings, ITimetableUpdates } from '../../interfaces'

/**
 * Goes through the settings to find unused study groups, and uses them.
 */
export default function withFixedSettings(
  { studyGroups, studyGroupMap }: IScheduleSettings,
  updates: Omit<
    ITimetableUpdates,
    'overrideStudyGroups' | 'overrideStudyGroupMap'
  >
): ITimetableUpdates {
  let override: boolean = false
  const studyGroupMapValues = new Set(studyGroupMap.values())

  // if problems existing, don't fix anything
  if (updates.problems && updates.problems.length) return updates

  for (let i = 0; i < studyGroups.length; i++) {
    //detect unused study group
    if (studyGroupMapValues.has(i)) continue

    // unused study group detected, create overrides
    override = true

    //remove the unused study group
    studyGroups.splice(i, 1)

    //update indexes in studyGroupMap
    for (let key of studyGroupMap.keys()) {
      if (studyGroupMap.get(key) > i) {
        studyGroupMap.set(key, studyGroupMap.get(key) - 1)
      }
    }
  }

  return override
    ? {
        ...updates,
        overrideStudyGroups: studyGroups,
        overrideStudyGroupMap: [...studyGroupMap.entries()],
      }
    : updates
}
