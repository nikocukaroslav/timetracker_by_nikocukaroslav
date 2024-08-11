import {
    ADD_WORK_SESSION,
    DELETE_WORK_SESSION,
    EDIT_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_SESSIONS,
    START_SESSION,
    STOP_SESSION
} from "@constants";

export const startSession = (session) => ({type: START_SESSION, payload: session})
export const stopSession = (session) => ({type: STOP_SESSION, payload: session})
export const getWorkSessions = (sessionId) => ({type: GET_SESSIONS, payload: sessionId})
export const getLastWorkSession = (userId) => ({type: GET_LAST_WORK_SESSION, payload: userId})
export const addWorkSession = (session) => ({type: ADD_WORK_SESSION, payload: session})
export const editWorkSession = (session) => ({type: EDIT_WORK_SESSION, payload: session})
export const deleteWorkSession = (sessionId) => ({type: DELETE_WORK_SESSION, payload: sessionId})
