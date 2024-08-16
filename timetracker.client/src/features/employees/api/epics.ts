import { catchError, map, of, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import store from "@store";
import { CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER } from "@constants";
import {
    createSuccessful,
    deleteSuccessful,
    getUsersSuccessful,
    getUserSuccessful,
    setLoading,
    updateSuccessful
} from "../employeesSlice.ts";
import { setError } from "@features/authentication/authenticationSlice.ts";
import { createUserMutation, deleteUserMutation, getUserQuery, getUsersQuery, updateUserMutation } from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";

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
                                return createSuccessful(response.data.users.createUser)
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
        switchMap(() =>
            graphQlQuery(getUsersQuery, {})
                .pipe(
                    map(response => getUsersSuccessful(response.data.users.users))
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
                    map(() => deleteSuccessful(action.payload))
                )
        )
    );

export const getUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USER),
        switchMap(action =>
            graphQlQuery(getUserQuery, {id: action.payload})
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
            graphQlQuery(updateUserMutation, {user: action.payload})
                .pipe(
                    map(response => updateSuccessful(response.data.users.updateUser)),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    )
