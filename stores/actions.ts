import { state } from ".";
import { resetClassState } from "./state/class";
import { resetSettings } from "./state/settings";
import { resetTimetableState } from "./state/timetable";

export const setSchool = (symbol: string | number, name: string) => {
    if (state.school.schoolSymbol != symbol) {
        state.school.schoolSymbol = symbol;
        state.school.schoolName = name;
        resetClassState();
        resetSettings();
        resetTimetableState();
    }
}

