import { catchError, map, of, switchMap, tap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import store from "@store";
import {
    authorizeError,
    authorizeSuccessful,
    createUserPasswordSuccessful,
    logoutSuccessful,
    refreshTokenSuccessful,
    resendCreatePasswordEmailError,
    resendCreatePasswordEmailSuccessful,
    setError,
    setLoading,
    temporaryLinkValidationError,
    temporaryLinkValidationSuccessful,
} from "../authenticationSlice.ts";
import {
    authorizeMutation,
    createUserPasswordMutation,
    loginMutation,
    logoutMutation,
    refreshTokenMutation,
    resendCreatePasswordEmailMutation,
    temporaryLinkValidationQuery,
} from "./requests.ts";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { getCookie } from "@utils/cookieHandlers.ts";
import {
    AUTHORIZE,
    CREATE_USER_PASSWORD,
    LOGIN,
    LOGOUT,
    REFRESH_TOKEN,
    RESEND_CREATE_PASSWORD_EMAIL,
    TEMPORARY_LINK_VALIDATION
} from "@constants";

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
                    catchError((error) => of(setError(error.message))),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    );

export const authorizeEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(AUTHORIZE),
        tap(() => store.dispatch(setError(""))),
        switchMap(() =>
            graphQlQuery(authorizeMutation, { refreshToken: getCookie("refreshToken") })
                .pipe(
                    map(response => {
                        if (response.errors)
                            return authorizeError();

                        return authorizeSuccessful(response.data.auth.authorize);
                    }),
                    catchError((error) => of(setError(error.message))),
                )
        )
    );


export const logoutEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(LOGOUT),
        tap(() => store.dispatch(setError(""))),
        switchMap(() =>
            graphQlQuery(logoutMutation, { refreshToken: getCookie("refreshToken") })
                .pipe(
                    map(() => logoutSuccessful()),
                    catchError((error) => of(setError(error.message))),
                )
        )
    )

export const refreshTokenEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(REFRESH_TOKEN),
        tap(() => store.dispatch(setError(""))),
        switchMap(() =>
            graphQlQuery(refreshTokenMutation, { refreshToken: getCookie("refreshToken") })
                .pipe(
                    map((response) => {
                        if (response.errors)
                            return authorizeError();

                        return refreshTokenSuccessful(response.data.auth);
                    }),
                    catchError((error) => of(setError(error.message))),
                )
        )
    )

export const createUserPasswordEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_USER_PASSWORD),
        switchMap(action =>
            graphQlQuery(createUserPasswordMutation, {
                password: action.payload.password,
                temporaryLinkId: action.payload.temporaryLinkId
            })
                .pipe(
                    map((response) => {
                        if (!response.errors)
                            return createUserPasswordSuccessful(response.data.users);
                        return setError(response.errors[0].message)
                    }),
                    catchError((error) => of(setError(error.message))),
                )
        )
    )

export const temporaryLinkValidationEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(TEMPORARY_LINK_VALIDATION),
        switchMap(action =>
            graphQlQuery(temporaryLinkValidationQuery, {
                temporaryLinkId: action.payload
            })
                .pipe(
                    map(response => {
                        if (!response.errors)
                            return temporaryLinkValidationSuccessful()
                        return temporaryLinkValidationError(response.errors[0].extensions.code)
                    }),
                    catchError((error) => of(setError(error.message))),
                )
        )
    )

export const resendCreatePasswordEmailEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(RESEND_CREATE_PASSWORD_EMAIL),
        switchMap(action =>
            graphQlQuery(resendCreatePasswordEmailMutation, {
                temporaryLinkId: action.payload
            })
                .pipe(
                    map(response => {
                        if (!response.errors)
                            return resendCreatePasswordEmailSuccessful(response.data.users.resendCreatePasswordEmail)
                        return resendCreatePasswordEmailError({
                            message: response.errors[0].message,
                            code: response.errors[0].extensions.code
                        })
                    }),
                    catchError((error) => of(setError(error.message))),
                )
        )
    )