import { switchMap, map } from "rxjs";
import { Epic, ofType } from "redux-observable";

import { MyAction } from "@interfaces/actions/globalActions.ts";
import { GET_ROLES } from "@constants";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import { getRolesQuery } from "@features/roles/api/requests.ts";
import { getRolesSuccessful } from "@features/roles/rolesSlice.ts";

export const getRolesEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_ROLES),
        switchMap(() =>
            graphQlQuery(getRolesQuery, {}
            ).pipe(
                map(response => getRolesSuccessful(response.data.roles.roles)),
            )
        ),
    );