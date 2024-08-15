import {
    createWorkDaysSuccessful,
    deleteWorkDaysSuccessful,
    getWorkDaysSuccessful,
    updateWorkDaysSuccessful
} from "@features/calendar/calendarSlice.ts";

import { CREATE_WORK_DAYS, DELETE_WORK_DAYS, GET_WORK_DAYS, UPDATE_WORK_DAYS } from "@constants";

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
    type: typeof updateWorkDaysSuccessful.type,
    payload: object
}

interface DeleteWorkDaysAction {
    type: typeof DELETE_WORK_DAYS,
    payload: string,
}

interface DeleteWorkDaysSuccessfulAction {
    type: typeof deleteWorkDaysSuccessful.type,
    payload: boolean
}

export type CalendarActions =
    GetWorkDaysAction
    | GetWorkDaysSuccessfulAction
    | CreateWorkDaysAction
    | CreateWorkDaysSuccessfulAction
    | UpdateWorkDaysAction
    | UpdateWorkDaysSuccessfulAction
    | DeleteWorkDaysAction
    | DeleteWorkDaysSuccessfulAction