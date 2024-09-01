import { getRolesSuccessful } from "@features/roles/rolesSlice.ts";

interface getRolesSuccessfulAction {
    type: typeof getRolesSuccessful.type;
    payload: []
}

export type RolesActions = getRolesSuccessfulAction;