import { DAYS_IN_WEEK, HOURS_OF_DAY, LessonOrMultiple } from "@yanshoof/types";
import { proxy } from "valtio";
import { initMatrix } from "../../../utils";

export interface IFullTimetableState {
    lessons: LessonOrMultiple[][],
    status: 'IDLE' | 'LOADING' | 'ERROR' | 'FETCHED',
}

const initialState: IFullTimetableState = {
    lessons: initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY),
    status: 'IDLE'
}

export const fullTimetableStateProxy = proxy({
    ...initialState
})

export const resetFullTimetableState = () => {
    fullTimetableStateProxy.status = 'IDLE';
    fullTimetableStateProxy.lessons = initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY);
}