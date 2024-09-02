import { createSlice } from "@reduxjs/toolkit";

import { RolesState } from "@interfaces/state.ts";

export const initialState: RolesState = {
    roles: [],
    loading: false,
}

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        getRolesSuccessful(state, action) {
            state.roles = action.payload;
        },
        createRoleSuccessful(state, action) {
            state.roles.push(action.payload)
        },
        deleteRoleSuccessful(state, { payload }) {
            state.roles = state.roles.filter(role => role.id !== payload)
        }
    }
})

export const {
    getRolesSuccessful,
    deleteRoleSuccessful,
    createRoleSuccessful
} = rolesSlice.actions;

export default rolesSlice.reducer;