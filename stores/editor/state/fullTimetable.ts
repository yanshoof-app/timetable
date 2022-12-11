import { DayOfWeek, DAYS_IN_WEEK, HourOfDay, HOURS_OF_DAY, LessonOrMultiple } from "@yanshoof/types";
import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { initMatrix } from "../../../utils";

export interface IFullTimetableState {
    lessons: LessonOrMultiple[][],
    status: 'IDLE' | 'LOADING' | 'ERROR' | 'FETCHED',
    problems: Set<string>,
}

export const fullTimetableStateProxy = proxy({
    lessons: initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY),
    status: 'IDLE',
    problems: proxySet([])
} as IFullTimetableState)

export const resetFullTimetableState = () => {
    fullTimetableStateProxy.status = 'IDLE';
    fullTimetableStateProxy.lessons = initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY);
    fullTimetableStateProxy.problems.clear();
}