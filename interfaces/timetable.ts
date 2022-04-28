import { DayOfWeek, HourOfDay, IChange, ILesson } from '@yanshoof/types'

/** The object returned from the updates route */
export interface ITimetableUpdates {
  overrideTimetable?: ILesson[][]
  newChanges?: IChange[]
  newOthersChanges?: IChange[]
  newEvents?: IChange[]
  problems?: [DayOfWeek, HourOfDay][]
  overrideStudyGroups?: [string, string][]
  overrideStudyGroupMap?: [string, number][]
}
