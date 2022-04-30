/**
 * Represents settings determined by the user.
 * @field showOthersChanges if on, when building the timetable, other changes made by the time a lesson takes place will be noted.
 * @field studyGroups an array of [subject, teacher] tuples, referenced in the study group map.
 * @field studyGroupMap maps a string in the form of 'day,hour' to the index of the study group, or -1 if no lesson is taking place at the time.
 */
export interface IScheduleSettings {
  showOthersChanges: boolean;
  studyGroups: [string, string][];
  studyGroupMap: Map<string, number>;
}

export function isSettingsObj(obj: unknown): obj is IScheduleSettings {
  return (
    typeof obj == 'object' &&
    'showOthersChanges' in obj &&
    'studyGroups' in obj &&
    'studyGroupMap' in obj
  );
}
