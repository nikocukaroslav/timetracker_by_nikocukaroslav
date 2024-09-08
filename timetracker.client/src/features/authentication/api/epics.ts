import { map, switchMap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import { authorizeSuccessful, logoutSuccessful, refreshTokenSuccessful, } from "../authenticationSlice.ts";
import { setError } from "@/store/slices/actionsStateSlice.ts";
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
import { fulfilled, resetState } from "@utils/actionStateHelpers.ts";
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
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(loginMutation, payload)
                .pipe(
                    map(({ errors, data }) => {
                        if (!errors)
                            return authorizeSuccessful(data.auth.login)

                        return setError({ type: LOGIN, error: errors[0] });
                    }),
                )
        ),
        fulfilled(LOGIN)
    );

export const authorizeEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(AUTHORIZE),
        resetState(),
        switchMap(() =>
            graphQlQuery(authorizeMutation, { refreshToken: getCookie("refreshToken") })
                .pipe(
                    map(({ errors, data }) => {
                        if (!errors)
                            return authorizeSuccessful(data.auth.authorize)

                        return setError({ type: AUTHORIZE, error: errors[0] });
                    }),
                )
        ),
        fulfilled(AUTHORIZE)
    );

export const logoutEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(LOGOUT),
        resetState(),
        switchMap(() =>
            graphQlQuery(logoutMutation, { refreshToken: getCookie("refreshToken") })
                .pipe(
                    map(({ errors }) => {
                        if (!errors)
                            return logoutSuccessful()

                        return setError({ type: LOGOUT, error: errors[0] });
                    }),
                )
        ),
        fulfilled(LOGOUT)
    )

export const refreshTokenEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(REFRESH_TOKEN),
        resetState(),
        switchMap(() =>
            graphQlQuery(refreshTokenMutation, { refreshToken: getCookie("refreshToken") })
                .pipe(
                    map(({ errors, data }) => {
                        if (!errors)
                            return refreshTokenSuccessful(data.auth)

                        return setError({ type: REFRESH_TOKEN, error: errors[0] });
                    }),
                )
        ),
        fulfilled(REFRESH_TOKEN)
    )

export const createUserPasswordEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_USER_PASSWORD),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(createUserPasswordMutation, payload)
                .pipe(
                    map(({ errors }) => {
                        if (errors)
                            return setError({ type: CREATE_USER_PASSWORD, error: errors[0] });
                    }),
                )
        ),
        fulfilled(CREATE_USER_PASSWORD)
    )

export const temporaryLinkValidationEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(TEMPORARY_LINK_VALIDATION),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(temporaryLinkValidationQuery, {
                temporaryLinkId: payload
            }).pipe(
                map(({ errors }) => {
                    if (errors)
                        return setError({ type: TEMPORARY_LINK_VALIDATION, error: errors[0] });
                }),
            )
        ),
        fulfilled(TEMPORARY_LINK_VALIDATION)
    )

export const resendCreatePasswordEmailEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(RESEND_CREATE_PASSWORD_EMAIL),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(resendCreatePasswordEmailMutation, {
                temporaryLinkId: payload
            }).pipe(
                map(({ errors }) => {
                    if (errors)
                        return setError({ type: RESEND_CREATE_PASSWORD_EMAIL, error: errors[0] });
                }),
            )
        ),
        fulfilled(RESEND_CREATE_PASSWORD_EMAIL)
    )