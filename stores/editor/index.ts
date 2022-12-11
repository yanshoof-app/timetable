import { proxy } from "valtio";
import { fullTimetableStateProxy } from "./state/fullTimetable";
import { settingsStateProxy } from "./state/settingsEditor";

export const editorState = proxy({ 
    fullTimetable: fullTimetableStateProxy,
    settings: settingsStateProxy
 })