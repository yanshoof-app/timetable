import { ILesson } from "@yanshoof/types"
import { proxy } from "valtio"

export interface ITimetableState {
    lessons: ILesson[][],
    lastUpdateTime?: Date
}

const initialState: ITimetableState = {
    lessons: [],
    lastUpdateTime: undefined
}

export const timetableStateProxy = proxy({
    ...initialState
})