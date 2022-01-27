import { DayOfWeek, HourOfDay } from '../utils/schedule/types';
import { IStudyGroup } from './lesson';

export interface IScheduleSettings {
  showOthersChanges: boolean;
  studyGroups: [string, string][];
  studyGroupMap: Map<string, number>;
}
