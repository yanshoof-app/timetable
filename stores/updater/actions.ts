import { updaterState } from ".";
import { ITimetableUpdates } from "../../interfaces";
import { ClientTimetable } from "../../utils/timetable/ClientTimetable";
import { state } from "../persisted";
import { setSettings, setTimetable } from "../persisted/actions";

export const initializeUpdater = (fetchUpdates: () => Promise<ITimetableUpdates>) => {
    if (updaterState.status === 'IDLE') {
        updaterState.status = 'FETCHING';
       fetchUpdates()
        .then((data) => {
            updaterState.status = 'FETCHED';
            if (data.overrideTimetable) {
                setTimetable(data.overrideTimetable);
                updaterState.status = 'APPLIED'
            }
            if (data.overrideStudyGroups && data.overrideStudyGroupMap) 
                setSettings(data.overrideStudyGroups, data.overrideStudyGroupMap);
        })
        .catch(() => {
            updaterState.status = 'ERROR';
        })
    }
}

export const applyUpdates = () => {
    if (updaterState.status === 'FETCHED') {
        const { newChanges, newOthersChanges, newEvents } = updaterState.data;
        const prev = state.timetable.lessons;
        const timetable = new ClientTimetable(
            prev,
            newChanges,
            newOthersChanges,
            newEvents
          )
        setTimetable(timetable.lessons);
    }
}