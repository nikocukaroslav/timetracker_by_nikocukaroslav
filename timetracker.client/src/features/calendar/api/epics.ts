import { Epic, ofType } from "redux-observable";
import { debounceTime, map, switchMap } from "rxjs";

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
    updateWorkDaySuccessful
} from "@features/calendar/calendarSlice.ts";
import { setError } from "@/store/slices/actionsStateSlice.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import {
    CREATE_WORK_DAYS,
    DELETE_WORK_DAYS,
    GET_WORK_DAYS,
    UPDATE_WORK_DAYS
} from "@features/calendar/types/actions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { fulfilled, resetState } from "@utils/actionStateHelpers.ts";

export const getWorkDaysEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_WORK_DAYS),
        resetState(),
        debounceTime(200),
        switchMap(({ payload }) =>
            graphQlQuery(getWorkDaysQuery, {
                    workDays: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return getWorkDaysSuccessful(data.users.workDays);

                    return setError({ type: GET_WORK_DAYS, error: errors[0] });
                }),
            ),
        ),
        fulfilled(GET_WORK_DAYS)
    );

export const createWorkDaysEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_WORK_DAYS),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(createWorkDaysMutation, {
                    workDays: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return createWorkDaysSuccessful(data.workDays.createWorkDays);

                    return setError({ type: CREATE_WORK_DAYS, error: errors[0] });
                }),
            )
        ),
        fulfilled(CREATE_WORK_DAYS)
    );

export const updateWorkDayEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_WORK_DAYS),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(updateWorkDayMutation, {
                    workDay: payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return updateWorkDaySuccessful(data.workDays.updateWorkDay);

                    return setError({ type: UPDATE_WORK_DAYS, error: errors[0] });
                }),
            )
        ),
        fulfilled(UPDATE_WORK_DAYS)
    );

export const deleteWorkDayEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_WORK_DAYS),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(deleteWorkDayMutation, {
                    id: payload
                }
            ).pipe(
                map(({ errors }) => {
                    if (!errors)
                        return deleteWorkDaySuccessful(payload);

                    return setError({ type: DELETE_WORK_DAYS, error: errors[0] });
                }),
            )
        ),
        fulfilled(DELETE_WORK_DAYS)
    );
