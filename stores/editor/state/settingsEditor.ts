import { IScheduleSettings } from "@yanshoof/settings"
import { proxy } from "valtio"
import { proxyMap } from "valtio/utils"

export type ISettingsState = Pick<IScheduleSettings, 'studyGroups' | 'studyGroupMap'>

export const settingsStateProxy = proxy({
    studyGroups: [],
    studyGroupMap: proxyMap([])
} as ISettingsState)