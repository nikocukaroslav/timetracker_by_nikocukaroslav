import {ofType} from "redux-observable";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {loginUser, setError, setLoading} from "../authenticationSlice.ts";
import {LOGIN} from "../../../constants.ts";
import {loginMutation} from "./mutations.ts";
import store from "../../../store.ts";


export const loginEpic = (action$) =>
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
                        if (response.data.login)
                            return loginUser(response.data.login)
                        
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
