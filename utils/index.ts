export { initMatrix } from './arrays';
export { fetchDataSource } from './datasource';
export * from './strings';
export * from './iScool';

// class exports
export type { IClassLookup, IClassesResponse } from './class/types';
export { ClassLookup } from './class';

// timetable exports

export type { IScheduleResponse, IChangesResponse } from './timetable/types';
export { Timetable } from './timetable/TimetableClass';
export { FullTimeable } from './timetable/FullTimetable';
