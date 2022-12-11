import { DayOfWeek, HourOfDay, IStudyGroup, LessonOrMultiple } from "@yanshoof/types";
import { editorState } from "."
import { state } from "../persisted";
import { IPersistedSettings } from "../persisted/state/settings";

const toDayHourString = (day: DayOfWeek, hour: HourOfDay) => {
    return `${day}${hour}`
}

const fromDayHourString = (dayHourString: string): [DayOfWeek, HourOfDay] => {
    return dayHourString.split(",").map(Number) as [DayOfWeek, HourOfDay]
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
        const [day, hour] = fromDayHourString(dayHourString);
        setWindow(day, hour);
    })
}

export const exportSettings = () => {
    // remove schedule settings of was-windows
    /*
    * Description of problem to solve here:
    * When the user manually sets an hour with one lesson option to WINDOW (day,hour=>-1)
    * And then RESETS the hour to the option, this will create a situation where there might be
    * an undetectable unused study group.
    * Method of tackling:
    * - Go through each hour overriden by settings
    * - If the setting there is not -1, and the hour has 1 option, remove the setting 
    */
    let studyGroupMap = [...editorState.settings.studyGroupMap].filter(([dayHourString, sgIndex]) => {
        const [day, hour] = fromDayHourString(dayHourString);
        return sgIndex == -1 || editorState.fullTimetable.lessons[day][hour].length > 1
    })

    // remove unused study groups
    /*
    * Description of problem to tackle here:
    * Often times there are unused study groups in the study group array. We would like to remove them.
    * Method of tackling:
    * - Create a set of indexes 0..(length-1)
    * - For each mapping, remove the mapping index from the set
    * - The remaining indexes in the set are unused
    */
    let studyGroups = [...editorState.settings.studyGroups]
    const unusedIndexes = new Set([...Array(editorState.settings.studyGroups.length).keys()]);
    studyGroupMap.forEach(([_, index]) => unusedIndexes.delete(index));
    unusedIndexes.forEach((unusedIndex) => {
        studyGroups = studyGroups.splice(unusedIndex, 1);
        studyGroupMap = studyGroupMap.map(([dayHour, index]) => ([dayHour, index > unusedIndex ? index - 1 : index]));
    })

    return { studyGroups, studyGroupMap } as IPersistedSettings;
}

