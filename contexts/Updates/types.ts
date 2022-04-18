import { IRefreshableTimetable } from './useRefreshableTimetable'

/*
export interface ITimetableContext extends IUpdateableTimetable {
  appendScheduleSetting(setting: IAppendSetting, isEditing?: boolean): void
  removeScheduleSetting(setting: IAppendSetting): void
  clearProblems(): void
}
*/
export interface IUpdatesContext extends IRefreshableTimetable {}
