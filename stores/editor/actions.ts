import { DayOfWeek, HourOfDay, IStudyGroup, LessonOrMultiple } from "@yanshoof/types";
import { editorState } from "."
import { state } from "../persisted";
import { IPersistedSettings } from "../persisted/state/settings";

export const toDayHourString = (day: DayOfWeek, hour: HourOfDay) => {
    return `${day}${hour}`
}

export const importStoredSettings = () => {
    editorState.settings.studyGroups = [...state.settings.studyGroups];
    state.settings.studyGroupMap.forEach(([lesson, groupIndex]) => {
        editorState.settings.studyGroupMap.set(lesson, groupIndex);
    })
}

export const initializeEditor = (fetchTimetable: () => Promise<LessonOrMultiple[][]>) => {
    if (editorState.fullTimetable.status === 'IDLE') {
        editorState.fullTimetable.status = 'LOADING';
        importStoredSettings();
        fetchTimetable()
            .then((timetable) => {
                editorState.fullTimetable.status = 'FETCHED',
                editorState.fullTimetable.lessons = timetable; 
            }).catch(() => {
                editorState.fullTimetable.status = 'ERROR';
            })
    }
}

export const setProblems = (problems: [DayOfWeek, HourOfDay][]) => {
    problems.forEach(([d, h]) => {
        editorState.fullTimetable.problems.add(toDayHourString(d, h));
    })
}

const setSgMap = (day: DayOfWeek, hour: HourOfDay, index: number) => {
    editorState.settings.studyGroupMap.set(toDayHourString(day, hour), index);
    editorState.fullTimetable.problems.delete(toDayHourString(day, hour));
}

export const appendSetting = (day: DayOfWeek, hour: HourOfDay, studyGroup: IStudyGroup) => {
    // find lesson index
    let idx = editorState.settings.studyGroups.findIndex(
        ([subject, teacher]) => subject === studyGroup.subject && teacher === studyGroup.teacher
    )
    // if index not found, add new study group
    if (idx === -1) {
        idx = editorState.settings.studyGroups.length;
        editorState.settings.studyGroups.push([studyGroup.subject, studyGroup.teacher]);
    }
    // store idx in map
    setSgMap(day, hour, idx);
}

export const setWindow = (day: DayOfWeek, hour: HourOfDay) => {
    setSgMap(day, hour, -1);
}

export const removeProblems = () => {
    editorState.fullTimetable.problems.forEach((dayHourString) => {
        const [day, hour] = dayHourString.split(",");
        setWindow(day as unknown as DayOfWeek, hour as unknown as HourOfDay);
    })
}

export const exportSettings = () => {
    // remove schedule settings of was-windows
    // remove unused study groups
    return {
        studyGroups: [...editorState.settings.studyGroups],
        studyGroupMap: [...editorState.settings.studyGroupMap.entries()]
    } as IPersistedSettings;
}

