export interface ILesson {
  subject: string;
  teacher: string;
  class: string; // Room string / Zoom / Async
}

export type DailySchedule = ILesson[];
export type WeeklySchedule = DailySchedule[7];

export type LessonOrMultiple = ILesson | ILesson[];
export type FullDailySchedule = LessonOrMultiple[];
export type FullWeeklySchedule = FullDailySchedule[7];
