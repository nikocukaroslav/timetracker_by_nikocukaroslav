import { catchError, map, of, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import store from "@store";
import { CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER } from "@constants";
import {
    getUsersSuccessful,
    getUserSuccessful, setFilter,
    setLoading,
} from "../employeesSlice.ts";
import { setError } from "@features/authentication/authenticationSlice.ts";
import {
    createUserMutation,
    deleteUserMutation,
    getUserQuery,
    getUsersQuery,
    updateUserMutation
} from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { getUsers } from "@features/employees/api/actions.ts";

export const createUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        tap(() => store.dispatch(setLoading(true))),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(createUserMutation, {
                    user: action.payload
                }
            )
                .pipe(
                    map(response => {
                            if (!response.errors)
                                return getUsers(
                                    {
                                        page: store.getState().employees.pagination.page,
                                        pageSize: store.getState().employees.pagination.pageSize
                                    },
                                    store.getState().employees.filter
                                );
                            return response.errors.forEach((message: string) => console.log(message))
                        }
                    ),
                    catchError((error) =>
                        of(setError(error.message))
                    ),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    );

export const getUsersEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USERS),
        switchMap(action =>
            graphQlQuery(getUsersQuery, {
                pagination: action.payload.pagination,
                filter: action.payload.filter
            })
                .pipe(
                    map(response => getUsersSuccessful(response.data.users.users)),
                    tap(() => store.dispatch(setFilter(action.payload.filter))),
                )
        )
    );

export const deleteUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_USER),
        switchMap(action =>
            graphQlQuery(deleteUserMutation, {
                    userId: action.payload
                }
            )
                .pipe(
                    map(response => {
                            if (!response.errors)
                                return getUsers(
                                    {
                                        page: store.getState().employees.pagination.page,
                                        pageSize: store.getState().employees.pagination.pageSize
                                    },
                                    store.getState().employees.filter
                                );
                            return response.errors.forEach((message: string) => console.log(message))
                        }
                    )
                )
        )
    );

export const getUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USER),
        switchMap(action =>
            graphQlQuery(getUserQuery, { id: action.payload })
                .pipe(
                    map(response => getUserSuccessful(response.data.users.user))
                )
        )
    )

export const updateUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_USER),
        tap(() => store.dispatch(setLoading(true))),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(updateUserMutation, { user: action.payload })
                .pipe(
                    map(response => {
                            if (!response.errors)
                                return getUsers(
                                    {
                                        page: store.getState().employees.pagination.page,
                                        pageSize: store.getState().employees.pagination.pageSize
                                    },
                                    store.getState().employees.filter
                                );
                            return response.errors.forEach((message: string) => console.log(message))
                        }
                    ),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    )
