import { createSlice } from "@reduxjs/toolkit";
import { ReportsState } from "@interfaces/state.ts";

export const initialState: ReportsState = {
    reports: [],
    pagination: {
        pageSize: Number(localStorage.getItem("reportsPageSize")) || 10,
    },
    filter: null,
}

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        getReportsSuccessful(state, { payload }) {
            state.reports = payload.items
            state.pagination.page = payload.page
            state.pagination.pageSize = payload.pageSize
            state.pagination.totalCount = payload.totalCount
            state.pagination.totalPages = payload.totalPages
            state.pagination.hasNextPage = payload.hasNextPage
            state.pagination.hasPreviousPage = payload.hasPreviousPage
        },
    },
})

export const {
    getReportsSuccessful,
} = reportsSlice.actions;

export default reportsSlice.reducer;
