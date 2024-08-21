import { Epic, ofType } from "redux-observable";
import { debounceTime, map, switchMap, tap } from "rxjs";

import {
    createWorkDaysMutation,
    deleteWorkDayMutation,
    getWorkDaysQuery,
    updateWorkDayMutation
} from "@features/calendar/api/requests.ts";
import {
    createWorkDaysSuccessful,
    deleteWorkDaySuccessful,
    getWorkDaysSuccessful,
    setLoading,
    updateWorkDaySuccessful
} from "@features/calendar/calendarSlice.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { CREATE_WORK_DAYS, DELETE_WORK_DAYS, GET_WORK_DAYS, UPDATE_WORK_DAYS } from "@constants";
import store from "@store";

export const getWorkDaysEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_WORK_DAYS),
        tap(() => store.dispatch(setLoading(true))),
        debounceTime(200),
        switchMap(action =>
            graphQlQuery(getWorkDaysQuery, {
                    workDays: action.payload
                }
            ).pipe(
                map(response => getWorkDaysSuccessful(response.data.users.workDays)),
                tap(() => store.dispatch(setLoading(false))),
            )
        )
    );

export const createWorkDaysEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_WORK_DAYS),
        switchMap(action =>
            graphQlQuery(createWorkDaysMutation, {
                    workDays: action.payload
                }
            ).pipe(
                map(response => createWorkDaysSuccessful(response.data.workDays.createWorkDays)),
            )
        )
    );

export const updateWorkDayEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_WORK_DAYS),
        switchMap(action =>
            graphQlQuery(updateWorkDayMutation, {
                    workDay: action.payload
                }
            ).pipe(
                map(response => updateWorkDaySuccessful(response.data.workDays.updateWorkDay)),
            )
        )
    );

export const deleteWorkDayEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_WORK_DAYS),
        switchMap(action =>
            graphQlQuery(deleteWorkDayMutation, {
                    id: action.payload
                }
            ).pipe(
                map(() => deleteWorkDaySuccessful(action.payload)),
            )
        )
    );
