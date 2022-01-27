import { IStudyGroup } from './lesson';

export interface ScheduleSettings {
  showOthersChanges: boolean;
  studyGroups: IStudyGroup[];
}
