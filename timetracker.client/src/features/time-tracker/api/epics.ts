import { map, switchMap } from "rxjs";
import { Epic, ofType } from "redux-observable";
import {
    createWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    startSuccessful,
    stopSuccessful,
    updateWorkSessionSuccessful
} from "../timeTrackerSlice.ts";
import { setError } from "@/store/slices/actionsStateSlice.ts";
import {
    createSessionMutation,
    deleteSessionMutation,
    getLastWorkSessionQuery,
    getWorkSessionsQuery,
    startSessionMutation,
    stopSessionMutation,
    updateSessionMutation
} from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { fulfilled, resetState } from "@utils/actionStateHelpers.ts";
import {
    CREATE_WORK_SESSION,
    DELETE_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_WORK_SESSIONS,
    START_SESSION,
    STOP_SESSION,
    UPDATE_WORK_SESSION
} from "@constants";

export const startSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(START_SESSION),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(startSessionMutation, {
                    session: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return startSuccessful(data.workSessions.startSession)

                    return setError({ type: START_SESSION, error: errors[0] });
                }),
            )
        ),
        fulfilled(START_SESSION)
    );

export const stopSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(STOP_SESSION),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(stopSessionMutation, {
                    session: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return stopSuccessful(data.workSessions.stopSession)

                    return setError({ type: STOP_SESSION, error: errors[0] });
                }),
            )
        ),
        fulfilled(STOP_SESSION)
    );

export const getWorkSessionsEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_WORK_SESSIONS),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(getWorkSessionsQuery, {
                    id: payload.userId,
                    pagination: payload.pagination,
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return getWorkSessionsSuccessful(data.users.workSessions)

                    return setError({ type: GET_WORK_SESSIONS, error: errors[0] });
                }),
            )
        ),
        fulfilled(GET_WORK_SESSIONS)
    );

export const getLastWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_LAST_WORK_SESSION),
        resetState(),
        switchMap(action =>
            graphQlQuery(getLastWorkSessionQuery, {
                    id: action.payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return getLastWorkSessionSuccessful(data.users.lastWorkSession);

                    return setError({ type: GET_LAST_WORK_SESSION, error: errors[0] });
                }),
            ),
        ),
        fulfilled(GET_LAST_WORK_SESSION)
    );

export const createWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_WORK_SESSION),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(createSessionMutation, {
                    session: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return createWorkSessionSuccessful(data.workSessions.createSession)

                    return setError({ type: CREATE_WORK_SESSION, error: errors[0] });
                }),
            )
        ),
        fulfilled(CREATE_WORK_SESSION)
    );

export const updateWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_WORK_SESSION),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(updateSessionMutation, {
                    session: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return updateWorkSessionSuccessful(data.workSessions.updateSession)

                    return setError({ type: UPDATE_WORK_SESSION, error: errors[0] });
                }),
            )
        ),
        fulfilled(UPDATE_WORK_SESSION)
    );

export const deleteWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_WORK_SESSION),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(deleteSessionMutation, {
                    id: payload
                }
            ).pipe(
                map(({ errors }) => {
                    if (!errors)
                        return deleteWorkSessionSuccessful(payload)

                    return setError({ type: DELETE_WORK_SESSION, error: errors[0] });
                }),
            )
        ),
        fulfilled(DELETE_WORK_SESSION)
    );

