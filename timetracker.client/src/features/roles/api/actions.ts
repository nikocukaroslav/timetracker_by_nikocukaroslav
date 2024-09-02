import { CREATE_ROLE, DELETE_ROLE, GET_ROLES } from "@constants";
import { RoleModel } from "@interfaces/domain.ts";

export const getRoles = () => ({ type: GET_ROLES })
export const createRole = (newRole: RoleModel) => ({ type: CREATE_ROLE, payload: newRole })
export const deleteRole = (id: string) => ({ type: DELETE_ROLE, payload: id })
