import { map, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import { CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER } from "@constants";
import { getUsersSuccessful, getUserSuccessful, setFilter } from "../employeesSlice.ts";
import { createUserMutation, deleteUserMutation, getUserQuery, getUsersQuery, updateUserMutation } from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { fulfilled, resetState } from "@utils/actionStateHelpers.ts";
import { getUsers } from "@features/employees/api/actions.ts";
import { setError } from "@/store/slices/actionsStateSlice.ts";
import store from "@store";

export const createUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(createUserMutation, {
                    user: payload
                }
            ).pipe(
                map(({ errors }) => {
                    if (!errors)
                        return getUsers(
                            {
                                page: store.getState().employees.pagination.page,
                                pageSize: store.getState().employees.pagination.pageSize
                            },
                            store.getState().employees.filter
                        );

                    return setError({ type: CREATE_USER, error: errors[0] });
                }),
            )
        ),
        fulfilled(CREATE_USER)
    );

export const getUsersEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USERS),
        resetState(),
        switchMap(action =>
            graphQlQuery(getUsersQuery, {
                pagination: action.payload.pagination,
                filter: action.payload.filter
            }).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return getUsersSuccessful(data.users.users)

                    return setError({ type: GET_USERS, error: errors[0] });
                }),
                tap(() => store.dispatch(setFilter(action.payload.filter))),
            )
        ),
        fulfilled(GET_USERS)
    );

export const deleteUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_USER),
        resetState(),
        switchMap(action =>
            graphQlQuery(deleteUserMutation, {
                    userId: action.payload
                }
            ).pipe(
                map(({ errors }) => {
                    if (!errors)
                        return getUsers(
                            {
                                page: store.getState().employees.pagination.page,
                                pageSize: store.getState().employees.pagination.pageSize
                            },
                            store.getState().employees.filter
                        );

                    return setError({ type: DELETE_USER, error: errors[0] });
                }),
            )
        ),
        fulfilled(DELETE_USER)
    );

export const getUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USER),
        resetState(),
        switchMap(action =>
            graphQlQuery(getUserQuery, { id: action.payload })
                .pipe(
                    map(({ errors, data }) => {
                        if (!errors)
                            return getUserSuccessful(data.users.user)

                        return setError({ type: GET_USER, error: errors[0] });
                    }),
                )
        ),
        fulfilled(GET_USER)
    )

export const updateUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_USER),
        resetState(),
        switchMap(action =>
            graphQlQuery(updateUserMutation, { user: action.payload })
                .pipe(
                    map(({ errors }) => {
                        if (!errors)
                            return getUsers(
                                {
                                    page: store.getState().employees.pagination.page,
                                    pageSize: store.getState().employees.pagination.pageSize
                                },
                                store.getState().employees.filter
                            );

                        return setError({ type: UPDATE_USER, error: errors[0] });
                    }),
                )
        ),
        fulfilled(UPDATE_USER)
    )
