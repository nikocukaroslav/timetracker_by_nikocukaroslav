import { createSlice } from "@reduxjs/toolkit";

import { RolesState } from "@interfaces/state.ts";

export const initialState: RolesState = {
    roles: []
}

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        getRolesSuccessful(state, action) {
            state.roles = action.payload;
        }
    }
})

export const {
    getRolesSuccessful
} = rolesSlice.actions;

export default rolesSlice.reducer;