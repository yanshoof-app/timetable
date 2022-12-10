import { state } from ".";
import { resetClassState } from "./persisted/class";
import { resetSettings } from "./persisted/settings";
import { resetTimetableState } from "./persisted/timetable";

export const setSchool = (symbol: string | number, name: string) => {
    if (state.school.schoolSymbol !== symbol) {
        state.school.schoolSymbol = symbol;
        state.school.schoolName = name;
        resetClassState();
        resetSettings();
        resetTimetableState();
    }
}

export const setClassOptions = (gradeOptions: number[], classIdOptions: number[][]) => {
    if (gradeOptions.length > state.class.gradeOptions.length
        && classIdOptions.length == gradeOptions.length) {
        state.class.gradeOptions = gradeOptions;
        state.class.classIdOptions = classIdOptions;
    }
}

export const setClass = (classId: string, grade: number, classNum: number) => {
    if (state.class.classId !== classId) {
        state.class.classId = classId;
        state.class.grade = grade;
        state.class.classNum = classNum;
        resetSettings();
        resetTimetableState();
    }
}


