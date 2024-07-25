import {ofType} from "redux-observable";
import {map, switchMap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {loginUser} from "../authenticationSlice.ts";
import {LOGIN} from "../../../constants.ts";
import {loginMutation} from "./mutations.ts";


export const loginEpic = (action$) =>
    action$.pipe(
        ofType(LOGIN),
        switchMap(action =>
            graphQlQuery(loginMutation, {
                email: action.payload.email,
                password: action.payload.password
            })
                .pipe(
                    map(response => {
                        loginUser(response.data.login)
                        console.log(response.data.login)
                    })
                )
        )
    );