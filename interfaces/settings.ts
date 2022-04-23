import { IScheduleSettings } from '@yanshoof/settings'

export function isSettingsObj(obj: unknown): obj is IScheduleSettings {
  return (
    typeof obj == 'object' &&
    'showOthersChanges' in obj &&
    'studyGroups' in obj &&
    'studyGroupMap' in obj
  )
}
