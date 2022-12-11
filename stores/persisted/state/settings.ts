import { IScheduleSettings } from "@yanshoof/settings";
import { proxy } from "valtio"

export interface IPersistedSettings extends Pick<IScheduleSettings, 'studyGroups'> {
    studyGroupMap: [string, number][]
}

export const settingsStateProxy = proxy({
    studyGroups: [],
    studyGroupMap: [],
} as IPersistedSettings)

export function resetSettings() {
    settingsStateProxy.studyGroupMap = [];
    settingsStateProxy.studyGroups = []
}