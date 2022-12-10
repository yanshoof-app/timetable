import { proxy } from "valtio"

export interface ISettingsState {
    studyGroups: string[],
    studyGroupMap: [string, number][]
}

export const settingsStateProxy = proxy({
    studyGroups: [],
    studyGroupMap: [],
} as ISettingsState)

export function resetSettings() {
    settingsStateProxy.studyGroupMap = [];
    settingsStateProxy.studyGroups = []
}