import {
    CREATE_WORK_SESSION,
    DELETE_WORK_SESSION,
    UPDATE_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_WORK_SESSIONS,
    START_SESSION,
    STOP_SESSION
} from "@constants";

export const startSession = (session) => ({ type: START_SESSION, payload: session })
export const stopSession = (session) => ({ type: STOP_SESSION, payload: session })
export const getWorkSessions = (userId, pagination) => ({ type: GET_WORK_SESSIONS, payload: { userId, pagination } })
export const getLastWorkSession = (userId) => ({ type: GET_LAST_WORK_SESSION, payload: userId })
export const createWorkSession = (session) => ({ type: CREATE_WORK_SESSION, payload: session })
export const updateWorkSession = (session) => ({ type: UPDATE_WORK_SESSION, payload: session })
export const deleteWorkSession = (sessionId) => ({ type: DELETE_WORK_SESSION, payload: sessionId })
