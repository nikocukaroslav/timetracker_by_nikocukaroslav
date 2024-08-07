import {
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    startSuccessful,
    stopSuccessful
} from "@features/time-tracker/timeTrackerSlice.ts";
import { GET_LAST_WORK_SESSION, GET_SESSIONS, START_SESSION, STOP_SESSION } from "@constants";

interface StartSessionAction {
    type: typeof START_SESSION,
    payload: object,
}

interface StopSessionAction {
    type: typeof STOP_SESSION,
    payload: string,
}

interface StartSuccessfulAction {
    type: typeof startSuccessful.type,
}

interface StopSuccessfulAction {
    type: typeof stopSuccessful.type,
}

interface GetWorkSessionsAction {
    type: typeof GET_SESSIONS,
    payload: string,
}

interface GetWorkSessionsSuccessfulAction {
    type: typeof getWorkSessionsSuccessful.type,
}

interface GetLastWorkSessionAction {
    type: typeof GET_LAST_WORK_SESSION,
    payload: string,
}

interface GetLastWorkSessionSuccessfulAction {
    type: typeof getLastWorkSessionSuccessful.type,
}


export type TimeTrackerActions =
    StartSessionAction
    | StopSessionAction
    | StartSuccessfulAction
    | StopSuccessfulAction
    | GetWorkSessionsAction
    | GetWorkSessionsSuccessfulAction
    | GetLastWorkSessionAction
    | GetLastWorkSessionSuccessfulAction