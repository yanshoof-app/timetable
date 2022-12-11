import { proxy } from "valtio";
import { ITimetableUpdates } from "../../interfaces";

export type UpdaterStatus = 'IDLE' | 'FETCHING' | 'FETCHED' | 'APPLIED' | 'ERROR'

export interface IUpdaterState {
    status: UpdaterStatus,
    data?: ITimetableUpdates
}

const initialState: IUpdaterState = {
    status: 'IDLE',
    data: undefined
}

export const updaterState = proxy({ ...initialState });

export const resetUpdaterState = () => {
    updaterState.status = 'IDLE';
    updaterState.data = undefined;
}

