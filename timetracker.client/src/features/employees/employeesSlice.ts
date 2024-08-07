import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: {},
    users: [],
    loading: false,
    status: ""
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        createSuccessful(state, action) {
            state.users.push(action.payload)
        },
        updateSuccessful(state, action) {
            const userToUpdate = state.users.find(user => user.id === action.payload.id)
            userToUpdate.permissions = action.payload.permissions
            userToUpdate.timeload = action.payload.timeload
            userToUpdate.position = action.payload.position
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
