export { initMatrix } from './data/arrays';
export { fetchDataSource } from './data/datasource';
export * from './data/strings';
export * from './data/iScool';

// class exports
export type { IClassLookup, IClassesResponse } from './class/types';
export { ClassLookup } from './class';

// timetable exports

export type { IScheduleResponse, IChangesResponse } from './timetable/types';
export { Timetable } from './timetable/TimetableClass';
export { FullTimeable } from './timetable/FullTimetable';
