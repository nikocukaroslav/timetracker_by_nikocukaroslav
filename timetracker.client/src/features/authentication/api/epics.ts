import {Epic, ofType} from "redux-observable";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {authorizeUser, loginUser, logoutUser, setError, setLoading, silentLogin} from "../authenticationSlice.ts";
import {AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN} from "../../../constants.ts";
import {authorizeMutation, loginMutation, logoutMutation, refreshTokenMutation} from "./mutations.ts";
import store from "../../../store.ts";
import {MyAction} from "../../../interfaces/actions.ts";


export const loginEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(LOGIN),
        tap(() => store.dispatch(setLoading(true))),
        switchMap(action =>
            graphQlQuery(loginMutation, {
                email: action.payload.email,
                password: action.payload.password
            })
                .pipe(
                    map(response => {
                        if (!response.errors)
                            return loginUser(response.data.auth.login)
                        return setError(response.errors[0].message)
                    }),
                    catchError((error) =>
                        of(setError(error.message))
                    ),
                    tap(() => store.dispatch(setLoading(false))),
                    tap(() => store.dispatch(setError(""))),
                )
        )
    );

export const authorizeEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(AUTHORIZE),
        switchMap(() =>
            graphQlQuery(authorizeMutation, {})
                .pipe(
                    map(response => authorizeUser(response.data.auth.authorize))
                )
        )
    )

export const logoutEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(LOGOUT),
        switchMap(() =>
            graphQlQuery(logoutMutation, {})
                .pipe(
                    map(() => logoutUser()),
                )
        )
    )

export const refreshTokenEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(REFRESH_TOKEN),
        switchMap(() =>
            graphQlQuery(refreshTokenMutation, {})
                .pipe(
                    map((response) => silentLogin(response.data.auth)),
                )
        )
    )