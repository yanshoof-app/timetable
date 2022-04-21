import { DayOfWeek, HourOfDay, IChange, ILesson } from '@yanshoof/types'

/** The object returned from the updates route */
export interface ITimetableUpdates {
  overrideTimetable?: ILesson[][]
  newChanges?: IChange[]
  problems?: [DayOfWeek, HourOfDay][]
  overrideStudyGroups?: [string, string][]
  overrideStudyGroupMap?: [string, number][]
}
