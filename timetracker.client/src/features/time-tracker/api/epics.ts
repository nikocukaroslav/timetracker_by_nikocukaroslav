import {Epic, ofType} from "redux-observable";
import {GET_LAST_WORK_SESSION, GET_SESSIONS, START_SESSION, STOP_SESSION} from "../../../constants.ts";
import {map, switchMap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {
    getLastWorkSessionSuccessful,
    getWorkSessionsSuccessful,
    startSuccessful,
    stopSuccessful
} from "../timeTrackerSlice.ts";
import {MyAction} from "../../../interfaces/actions/globalActions.ts";
import {getLastWorkSessionQuery, getSessionsQuery, startSessionMutation, stopSessionMutation} from "./requests.ts";

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
        switchMap(action =>
            graphQlQuery(getLastWorkSessionQuery, {
                    id: action.payload
                }
            ).pipe(
                map(response => getLastWorkSessionSuccessful(response.data.users.getLastWorkSession))
            )
        )
    );