import { createSlice } from "@reduxjs/toolkit";

import { EmployeesState } from "@interfaces/state.ts";

export const initialState: EmployeesState = {
    user: {},
    users: [],
    loading: false,
    pagination: {
        pageSize: Number(localStorage.getItem("employeesPageSize")) || 10,
    },
    filter: null,
    error: null,
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
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
        setLoading(state, action) {
            state.loading = action.payload
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
})

export const {
    getUsersSuccessful,
    setLoading,
    setFilter,
    getUserSuccessful,
    setError,
} = employeesSlice.actions;

export default employeesSlice.reducer;
