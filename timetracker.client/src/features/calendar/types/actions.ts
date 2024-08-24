import {
    createWorkDaysSuccessful,
    deleteWorkDaySuccessful,
    getWorkDaysSuccessful,
    updateWorkDaySuccessful
} from "@features/calendar/calendarSlice.ts";

export const GET_WORK_DAYS = "GET_WORK_DAYS"
export const CREATE_WORK_DAYS = "CREATE_WORK_DAYS"
export const UPDATE_WORK_DAYS = "UPDATE_WORK_DAYS"
export const DELETE_WORK_DAYS = "DELETE_WORK_DAYS"

interface GetWorkDaysAction {
    type: typeof GET_WORK_DAYS,
    payload: string,
}

interface GetWorkDaysSuccessfulAction {
    type: typeof getWorkDaysSuccessful.type,
    payload: object
}

interface CreateWorkDaysAction {
    type: typeof CREATE_WORK_DAYS,
    payload: object,
}

interface CreateWorkDaysSuccessfulAction {
    type: typeof createWorkDaysSuccessful.type,
    payload: object
}

interface UpdateWorkDaysAction {
    type: typeof UPDATE_WORK_DAYS,
    payload: object,
}

interface UpdateWorkDaysSuccessfulAction {
    type: typeof updateWorkDaySuccessful.type,
    payload: object
}

interface DeleteWorkDaysAction {
    type: typeof DELETE_WORK_DAYS,
    payload: string,
}

interface DeleteWorkDaysSuccessfulAction {
    type: typeof deleteWorkDaySuccessful.type,
    payload: boolean
}

export type WorkDayActions =
    GetWorkDaysAction
    | GetWorkDaysSuccessfulAction
    | CreateWorkDaysAction
    | CreateWorkDaysSuccessfulAction
    | UpdateWorkDaysAction
    | UpdateWorkDaysSuccessfulAction
    | DeleteWorkDaysAction
    | DeleteWorkDaysSuccessfulAction