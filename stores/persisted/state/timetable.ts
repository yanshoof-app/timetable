import { DAYS_IN_WEEK, HOURS_OF_DAY, ILesson } from "@yanshoof/types"
import { proxy } from "valtio"
import { initMatrix } from "../../../utils"

export interface ITimetableState {
    lessons: ILesson[][],
    lastUpdateTime?: Date
}

const initialState: ITimetableState = {
    lessons: initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY),
    lastUpdateTime: undefined
}

export const timetableStateProxy = proxy({
    ...initialState
})

export const resetTimetableState = () => {
    timetableStateProxy.lastUpdateTime = undefined;
    timetableStateProxy.lessons = initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY);
  };