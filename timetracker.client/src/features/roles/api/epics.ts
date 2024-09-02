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

export const deleteRoleEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(DELETE_ROLE),
        switchMap((action) =>
            graphQlQuery(deleteRoleMutation, {
                    id: action.payload
                }
            ).pipe(
                map(() => deleteRoleSuccessful(action.payload)),
            )
        ),
    );

export const createRoleEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_ROLE),
        switchMap((action) =>
            graphQlQuery(createRoleMutation, {
                    role: action.payload
                }
            ).pipe(
                map(response => createRoleSuccessful(response.data.roles.createRole)),
            )
        ),
    );

export const updateRoleEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_ROLE),
        switchMap((action) =>
            graphQlQuery(updateRoleMutation, {
                    role: action.payload
                }
            ).pipe(
                map(response => updateRoleSuccessful(response.data.roles.updateRole)),
            )
        ),
    );

