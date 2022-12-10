import { proxy } from "valtio"
import { proxyMap } from "valtio/utils"

export interface ISettingsState {
    studyGroups: string[],
    studyGroupMap: Map<string, number>
}

export const settingsStateProxy = proxy({
    studyGroups: [],
    studyGroupMap: proxyMap([])
} as ISettingsState)