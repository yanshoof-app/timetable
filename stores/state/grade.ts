import { proxy } from "valtio"

export interface IGradeState {
    classId?: string,
    grade?: number,
    classNum?: number,
    gradeOptions: number[]
    classIdOptions: number[][]
}

const initialState: IGradeState = {
    classId: undefined,
    grade: undefined,
    classNum: undefined,
    gradeOptions: [],
    classIdOptions: []
}

export const gradeStateProxy = proxy({
    ...initialState
})