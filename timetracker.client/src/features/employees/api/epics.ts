import {ofType} from "redux-observable";
import {CREATE_USER} from "../../../constants.ts";
import {map, switchMap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {addUserMutation} from "./mutations.ts";

export const createUserEpic = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        switchMap(action =>
            graphQlQuery(addUserMutation, {
                    user: action.payload
                }
            )
                .pipe(
                    map(response => {
                        console.log(response)
                    })
                )
        )
    );