import { CREATE_ROLE, DELETE_ROLE, GET_ROLES, UPDATE_ROLE } from "@constants";
import { RoleModel } from "@interfaces/domain.ts";

export const getRoles = () => ({ type: GET_ROLES })
export const createRole = (newRole: RoleModel) => ({ type: CREATE_ROLE, payload: newRole })
export const updateRole = (updatedRole: RoleModel) => ({ type: UPDATE_ROLE, payload: updatedRole })
export const deleteRole = (id: string) => ({ type: DELETE_ROLE, payload: id })
