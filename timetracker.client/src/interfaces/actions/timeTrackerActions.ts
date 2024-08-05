import {start, stop} from "../../features/time-tracker/timeTrackerSlice.ts";
import {START_SESSION, STOP_SESSION} from "../../constants.ts";

export interface StartSession {
    type: typeof START_SESSION,
    payload: object,
}

export interface StopSession {
    type: typeof STOP_SESSION,
    payload: string,
}

export interface Start {
    type: typeof start.type,
}

export interface Stop {
    type: typeof stop.type,
}

export type TimeTrackerActions =
    StartSession
    | StopSession
    | Start
    | Stop