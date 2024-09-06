import { map, switchMap } from "rxjs";
import { Epic, ofType } from "redux-observable";

import { MyAction } from "@interfaces/actions/globalActions.ts";
import { CREATE_ROLE, DELETE_ROLE, GET_ROLES, UPDATE_ROLE } from "@constants";
import { graphQlQuery } from "@utils/graphQlQuery.ts";
import {
    createRoleMutation,
    deleteRoleMutation,
    getRolesQuery,
    updateRoleMutation
} from "@features/roles/api/requests.ts";
import {
    createRoleSuccessful,
    deleteRoleSuccessful,
    getRolesSuccessful,
    updateRoleSuccessful
} from "@features/roles/rolesSlice.ts";
import { fulfilled, resetState } from "@utils/actionStateHelpers.ts";
import { setError } from "@/store/slices/actionsStateSlice.ts";

export const getRolesEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_ROLES),
        resetState(),
        switchMap(() =>
            graphQlQuery(getRolesQuery, {}).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return getRolesSuccessful(data.roles.roles)

                    return setError({ type: GET_ROLES, error: errors[0] });
                }),
            )
        ),
        fulfilled(GET_ROLES)
    );

export const deleteRoleEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_ROLE),
        resetState(),
        switchMap(({ payload }) =>
            graphQlQuery(deleteRoleMutation, {
                    id: payload
                }
            ).pipe(
                map(({ errors }) => {
                    if (!errors)
                        return deleteRoleSuccessful(payload)

                    return setError({ type: DELETE_ROLE, error: errors[0] });
                }),
            )
        ),
        fulfilled(DELETE_ROLE)
    );

export const createRoleEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_ROLE),
        resetState(),
        switchMap((action) =>
            graphQlQuery(createRoleMutation, {
                    role: action.payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return createRoleSuccessful(data.roles.createRole)

                    return setError({ type: CREATE_ROLE, error: errors[0] });
                }),
            )
        ),
        fulfilled(CREATE_ROLE)
    );

export const updateRoleEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_ROLE),
        resetState(),
        switchMap((action) =>
            graphQlQuery(updateRoleMutation, {
                    role: action.payload
                }
            ).pipe(
                map(({ errors, data }) => {
                    if (!errors)
                        return updateRoleSuccessful(data.roles.updateRole)

                    return setError({ type: UPDATE_ROLE, error: errors[0] });
                })
            )
        ),
        fulfilled(UPDATE_ROLE)
    );

