import { map, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import store from "@store";
import {
    addWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    editWorkSessionSuccessful,
    getLastWorkSessionError,
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    setSearchingLastSession,
    startSuccessful,
    stopSuccessful
} from "../timeTrackerSlice.ts";
import {
    addSessionMutation,
    deleteSessionMutation,
    editSessionMutation,
    getLastWorkSessionQuery,
    getSessionsQuery,
    startSessionMutation,
    stopSessionMutation
} from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import {
    ADD_WORK_SESSION,
    DELETE_WORK_SESSION,
    EDIT_WORK_SESSION,
    GET_LAST_WORK_SESSION,
    GET_SESSIONS,
    START_SESSION,
    STOP_SESSION
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

export const getSessionsEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_SESSIONS),
        switchMap(action =>
            graphQlQuery(getSessionsQuery, {
                    id: action.payload
                }
            ).pipe(
                map(response => getWorkSessionsSuccessful(response.data.users.getWorkSessions)),
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

                    return getLastWorkSessionSuccessful(response.data.users.getLastWorkSession);
                }),
            ),
        )
    );

export const addWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(ADD_WORK_SESSION),
        switchMap(action =>
            graphQlQuery(addSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => addWorkSessionSuccessful(response.data.workSessions.addSession)),
            )
        )
    );

export const editWorkSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(EDIT_WORK_SESSION),
        switchMap(action =>
            graphQlQuery(editSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => editWorkSessionSuccessful(response.data.workSessions.editSession)),
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

