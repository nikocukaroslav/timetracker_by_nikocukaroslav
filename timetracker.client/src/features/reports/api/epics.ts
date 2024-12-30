import { Epic, ofType } from "redux-observable";
import { MyAction } from "@interfaces/actions/globalActions.ts";
import { GET_REPORTS } from "@constants";
import { fulfilled, resetState } from "@utils/actionStateHelpers.ts";
import { map, switchMap, tap } from "rxjs";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { setError } from "@/store/slices/actionsStateSlice.ts";
import { getReportsQuery } from "@features/reports/api/requests.ts";
import { getReportsSuccessful } from "@features/reports/reportsSlice.ts";

export const getReportsEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_REPORTS),
        resetState(),
        switchMap(action =>
            graphQlQuery(getReportsQuery, {
                pagination: action.payload.pagination,
                filter: action.payload.filter,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            }).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return getReportsSuccessful(data.users.usersReport)

                    return setError({ type: GET_REPORTS, error: errors[0] });
                }),
            )
        ),
        fulfilled(GET_REPORTS)
    );

