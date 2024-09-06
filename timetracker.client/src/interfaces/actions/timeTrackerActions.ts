import {
    createWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    startSuccessful,
    stopSuccessful,
    updateWorkSessionSuccessful
} from "@features/time-tracker/timeTrackerSlice.ts";

import {
    CREATE_WORK_SESSION,
    DELETE_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_WORK_SESSIONS,
    START_SESSION,
    STOP_SESSION,
    UPDATE_WORK_SESSION
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
    type: typeof GET_WORK_SESSIONS,
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

interface CreateWorkSessionAction {
    type: typeof CREATE_WORK_SESSION,
    payload: object,
}

interface CreateWorkSessionSuccessfulAction {
    type: typeof createWorkSessionSuccessful.type,
}

interface UpdateWorkSessionAction {
    type: typeof UPDATE_WORK_SESSION,
    payload: object,
}

interface UpdateWorkSessionSuccessfulAction {
    type: typeof updateWorkSessionSuccessful.type,
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
    | CreateWorkSessionAction
    | CreateWorkSessionSuccessfulAction
    | UpdateWorkSessionAction
    | UpdateWorkSessionSuccessfulAction
    | DeleteWorkSessionAction
    | DeleteWorkSessionSuccessfulAction