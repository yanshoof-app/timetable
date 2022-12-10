import { proxy } from "valtio"

export interface IPrefrencesState {
    showOtherChanges: boolean,
    theme: 'system' | 'light' | 'dark'
}

const initialState: IPrefrencesState = {
    showOtherChanges: true,
    theme: 'system'
}

export const prefrenceStateProxy = proxy({
    ...initialState
})