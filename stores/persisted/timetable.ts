import { DAYS_IN_WEEK, HOURS_OF_DAY, ILesson } from "@yanshoof/types"
import { proxy } from "valtio"
import { initMatrix } from "../../utils"

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

type InitialStateType = Partial<ITimetableState>
export const resetTimetableState = () => {
    const objToReset = timetableStateProxy as InitialStateType;
    let key: keyof InitialStateType;
  
    for (key in objToReset) {
      delete objToReset[key];
    }
  
    for (key in initialState) {
      objToReset[key] = initialState[key] as never;
    }
  };