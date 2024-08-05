import {Epic, ofType} from "redux-observable";
import {START_SESSION, STOP_SESSION} from "../../../constants.ts";
import {map, switchMap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {start, stop} from "../timeTrackerSlice.ts";
import {MyAction} from "../../../interfaces/actions/globalActions.ts";
import {startSessionMutation, stopSessionMutation} from "./requests.ts";


export const startSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(START_SESSION),
        switchMap(action =>
            graphQlQuery(startSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => start(response.data)),
            )
        )
    );

export const stopSessionEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(STOP_SESSION),
        switchMap(action =>
            graphQlQuery(stopSessionMutation, {
                    session: action.payload
                }
            ).pipe(
                map(response => stop(response.data)),
            )
        )
    );