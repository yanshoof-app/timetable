export interface ILesson {
  subject: string;
  teacher: string;
  class: string; // Room string / Zoom / Async
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HourOfDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type DailySchedule = ILesson[];
export type WeeklySchedule = DailySchedule[7];

export type LessonOrMultiple = ILesson | ILesson[];
export type FullDailySchedule = LessonOrMultiple[];
export type FullWeeklySchedule = FullDailySchedule[7];
