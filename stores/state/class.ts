import { proxy } from "valtio"

export interface IClassState {
    classId?: string,
    grade?: number,
    classNum?: number,
    gradeOptions: number[]
    classIdOptions: number[][]
}

const initialState: IClassState = {
    classId: undefined,
    grade: undefined,
    classNum: undefined,
    gradeOptions: [],
    classIdOptions: []
}

export const classStateProxy = proxy({
    ...initialState
})

type InitialStateType = Partial<IClassState>
export const resetClassState = () => {
    const objToReset = classStateProxy as InitialStateType;
    let key: keyof InitialStateType;
  
    for (key in objToReset) {
      delete objToReset[key];
    }
  
    for (key in initialState) {
      objToReset[key] = initialState[key] as never;
    }
  };