import { createSlice } from "@reduxjs/toolkit";
import { EmployeesState } from "@interfaces/state.ts";

export const initialState: EmployeesState = {
    user: {},
    users: [],
    loading: false,
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        createSuccessful(state, action) {
            state.users.push(action.payload)
        },
        updateSuccessful(state, {payload}) {
            const {id, name, surname, permissions, timeload, position} = payload;
            const userToUpdate = state.users.find(user => user.id === id)

            if (!userToUpdate) return

            userToUpdate.name = name;
            userToUpdate.surname = surname;
            userToUpdate.permissions = permissions;
            userToUpdate.timeload = timeload;
            userToUpdate.position = position;
        },
        deleteSuccessful(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        getUserSuccessful(state, action) {
            state.user = action.payload
        },
        getUsersSuccessful(state, action) {
            state.users = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    },
})

export const {
    createSuccessful,
    getUsersSuccessful,
    deleteSuccessful,
    setLoading,
    getUserSuccessful,
    updateSuccessful
} = employeesSlice.actions;

export default employeesSlice.reducer;
