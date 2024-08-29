import { catchError, map, of, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import store from "@store";
import {
    createWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    getLastWorkSessionError,
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    setError,
    setSearchingLastSession,
    startSuccessful,
    stopSuccessful,
    updateWorkSessionSuccessful
} from "../timeTrackerSlice.ts";
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
        switchMap(action =>
            graphQlQuery(startSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => startSuccessful(response.data.workSessions.startSession)),
            )
        )
    );

export const stopSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(STOP_SESSION),
        switchMap(action =>
            graphQlQuery(stopSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => stopSuccessful(response.data.workSessions.stopSession)),
            )
        )
    );

export const getWorkSessionsEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_WORK_SESSIONS),
        switchMap(action =>
            graphQlQuery(getWorkSessionsQuery, {
                    id: action.payload.userId,
                    pagination: action.payload.pagination,
                }
            ).pipe(
                map(response => getWorkSessionsSuccessful(response.data.users.workSessions)),
            )
        )
    );

export const getLastWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_LAST_WORK_SESSION),
        tap(() => store.dispatch(setSearchingLastSession(true))),
        switchMap(action =>
            graphQlQuery(getLastWorkSessionQuery, {
                    id: action.payload
                }
            ).pipe(
                map((response) => {
                    if (response.errors)
                        return getLastWorkSessionError();

                    return getLastWorkSessionSuccessful(response.data.users.lastWorkSession);
                }),
            ),
        )
    );

export const createWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_WORK_SESSION),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(createSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => {
                    if (!response.errors)
                        return createWorkSessionSuccessful(response.data.workSessions.createSession)
                    else
                        return setError(response.errors[0].message)
                }),
                catchError((error) =>
                    of(setError(error))
                ),
            )
        )
    );

export const updateWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_WORK_SESSION),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(updateSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => {
                    if (!response.errors)
                        return updateWorkSessionSuccessful(response.data.workSessions.updateSession)
                    else
                        return setError(response.errors[0].message)
                }),
                catchError((error) =>
                    of(setError(error))
                ),
            )
        )
    );

export const deleteWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_WORK_SESSION),
        switchMap(action =>
            graphQlQuery(deleteSessionMutation, {
                    id: action.payload
                }
            ).pipe(
                map(() => deleteWorkSessionSuccessful(action.payload))
            )
        )
    );

