import { StudyGroupMapSettings } from '@yanshoof/settings'
import { ITimetableUpdates } from '../../interfaces'

/**
 * Goes through the settings to find unused study groups, and uses them.
 */
export default function withFixedSettings(
  settings: StudyGroupMapSettings<unknown>,
  updates: Omit<
    ITimetableUpdates,
    'overrideStudyGroups' | 'overrideStudyGroupMap'
  >
): ITimetableUpdates {
  const shouldOverride = settings.repair()

  return shouldOverride
    ? {
        ...updates,
        overrideStudyGroups: settings.studyGroups,
        overrideStudyGroupMap: [...settings.studyGroupMap.entries()],
      }
    : updates
}
