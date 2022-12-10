import { proxy } from "valtio"

export interface ISchoolState {
    schoolSymbol: string | number // xxxxxx
    schoolName: string
}

const initialState: ISchoolState = {
    schoolSymbol: '',
    schoolName: ''
}

export const schoolStateProxy = proxy({
    ...initialState
})