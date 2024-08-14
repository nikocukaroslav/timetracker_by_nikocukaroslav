import {
    addWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    editWorkSessionSuccessful, getLastWorkSessionError,
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    startSuccessful,
    stopSuccessful
} from "@features/time-tracker/timeTrackerSlice.ts";

import {
    ADD_WORK_SESSION,
    DELETE_WORK_SESSION,
    EDIT_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_SESSIONS,
    START_SESSION,
    STOP_SESSION
} from "@constants";

interface StartSessionAction {
    type: typeof START_SESSION,
    payload: object,
}

interface StartSuccessfulAction {
    type: typeof startSuccessful.type,
}

interface StopSessionAction {
    type: typeof STOP_SESSION,
    payload: string,
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
interface GetLastWorkSessionErrorAction {
    type: typeof getLastWorkSessionError.type,
}

interface AddWorkSessionAction {
    type: typeof ADD_WORK_SESSION,
    payload: object,
}

interface AddWorkSessionSuccessfulAction {
    type: typeof addWorkSessionSuccessful.type,
}

interface EditWorkSessionAction {
    type: typeof EDIT_WORK_SESSION,
    payload: object,
}

interface EditWorkSessionSuccessfulAction {
    type: typeof editWorkSessionSuccessful.type,
}

interface DeleteWorkSessionAction {
    type: typeof DELETE_WORK_SESSION,
    payload: boolean,
}

interface DeleteWorkSessionSuccessfulAction {
    type: typeof deleteWorkSessionSuccessful.type,
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
    | GetLastWorkSessionErrorAction
    | AddWorkSessionAction
    | AddWorkSessionSuccessfulAction
    | EditWorkSessionAction
    | EditWorkSessionSuccessfulAction
    | DeleteWorkSessionAction
    | DeleteWorkSessionSuccessfulAction