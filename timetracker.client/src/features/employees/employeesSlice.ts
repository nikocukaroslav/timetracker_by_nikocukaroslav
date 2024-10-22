import { createSlice } from "@reduxjs/toolkit";

import { EmployeesState } from "@interfaces/state.ts";

export const initialState: EmployeesState = {
    user: {},
    users: [],
    pagination: {
        pageSize: Number(localStorage.getItem("employeesPageSize")) || 10,
    },
    filter: null,
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        getUserSuccessful(state, action) {
            state.user = action.payload
        },
        getUsersSuccessful(state, action) {
            state.users = action.payload.items
            state.pagination.page = action.payload.page
            state.pagination.pageSize = action.payload.pageSize
            state.pagination.totalCount = action.payload.totalCount
            state.pagination.totalPages = action.payload.totalPages
            state.pagination.hasNextPage = action.payload.hasNextPage
            state.pagination.hasPreviousPage = action.payload.hasPreviousPage
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
    },
})

export const {
    setUsers,
    getUsersSuccessful,
    setFilter,
    getUserSuccessful,
} = employeesSlice.actions;

export default employeesSlice.reducer;
