import {
    CREATE_WORK_SESSION,
    DELETE_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_WORK_SESSIONS,
    START_SESSION,
    STOP_SESSION,
    UPDATE_WORK_SESSION
} from "@constants";
import { PaginationModel } from "@interfaces/domain.ts";

export const startSession = (session: {
    userId: string,
    startTime: number,
}) => ({ type: START_SESSION, payload: session })
export const stopSession = (session: {
    id: string,
    endTime: number,
}) => ({ type: STOP_SESSION, payload: session })
export const getReports = (userId: string, pagination: PaginationModel) => ({
    type: GET_WORK_SESSIONS,
    payload: { userId, pagination }
})
export const getLastWorkSession = (userId: string) => ({ type: GET_LAST_WORK_SESSION, payload: userId })
export const createWorkSession = (session: {
    startTime: number,
    endTime: number,
    userId: string
}) => ({ type: CREATE_WORK_SESSION, payload: session })
export const updateWorkSession = (session: {
    id: string,
    startTime: number,
    endTime: number,
    editedAt: number,
    editorId: string,
}) => ({ type: UPDATE_WORK_SESSION, payload: session })
export const deleteWorkSession = (sessionId: string) => ({ type: DELETE_WORK_SESSION, payload: sessionId })
