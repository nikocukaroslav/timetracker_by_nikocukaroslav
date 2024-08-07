import { catchError, map, of, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import store from "@store";
import {
    authorizeSuccessful,
    logoutSuccessful,
    refreshTokenSuccessful,
    setError,
    setLoading
} from "../authenticationSlice.ts";
import { authorizeMutation, loginMutation, logoutMutation, refreshTokenMutation } from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { getCookie } from "@utils/cookieHandlers.ts";
import { AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN } from "@constants";

export const loginEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(LOGIN),
        tap(() => store.dispatch(setLoading(true))),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(loginMutation, {
                email: action.payload.email,
                password: action.payload.password
            })
                .pipe(
                    map(response => {
                        if (!response.errors)
                            return authorizeSuccessful(response.data.auth.login)
                        return setError(response.errors[0].message)
                    }),
                    catchError((error) =>
                        of(setError(error.message))
                    ),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    );

export const authorizeEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(AUTHORIZE),
        tap(() => store.dispatch(setLoading(true))),
        switchMap(() =>
            graphQlQuery(authorizeMutation, {refreshToken: getCookie("refreshToken")})
                .pipe(
                    map(response => authorizeSuccessful(response.data.auth.authorize)),
                    catchError((error) =>
                        of(setError(error.message))
                    ),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    );


export const logoutEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(LOGOUT),
        switchMap(() =>
            graphQlQuery(logoutMutation, {refreshToken: getCookie("refreshToken")})
                .pipe(
                    map(() => logoutSuccessful()),
                )
        )
    )

export const refreshTokenEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(REFRESH_TOKEN),
        switchMap(() =>
            graphQlQuery(refreshTokenMutation, {refreshToken: getCookie("refreshToken")})
                .pipe(
                    map((response) => refreshTokenSuccessful(response.data.auth)),
                )
        )
    )