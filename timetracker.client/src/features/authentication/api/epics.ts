import {Epic, ofType} from "redux-observable";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {authorizeUser, logoutUser, setError, setLoading, silentTokenRefresh} from "../authenticationSlice.ts";
import {AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN} from "../../../constants.ts";
import {authorizeMutation, loginMutation, logoutMutation, refreshTokenMutation} from "./mutations.ts";
import store from "../../../store.ts";
import {MyAction} from "../../../interfaces/actions.ts";
import {getCookie} from "../../../utils/cookieHandler.ts";


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
                            return authorizeUser(response.data.auth.login)
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
                    map(response => authorizeUser(response.data.auth.authorize)),
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
                    map(() => logoutUser()),
                )
        )
    )

export const refreshTokenEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(REFRESH_TOKEN),
        switchMap(() =>
            graphQlQuery(refreshTokenMutation, {refreshToken: getCookie("refreshToken")})
                .pipe(
                    map((response) => silentTokenRefresh(response.data.auth)),
                )
        )
    )