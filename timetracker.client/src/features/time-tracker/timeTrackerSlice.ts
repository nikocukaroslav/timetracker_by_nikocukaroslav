import { createSlice } from "@reduxjs/toolkit";

import { WorkSessionModel } from "@interfaces/domain.ts";
import { TimeTrackerState } from "@interfaces/state.ts";

const initialState: TimeTrackerState = {
    workSessions: [],
    sessionId: null,
    isTracking: false,
    searchingLastSession: false,
    timeStart: null,
    pagination: {
        pageSize: Number(localStorage.getItem("trackerPageSize")) || 20,
    }
}

const timeTrackerSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        startSuccessful(state, action) {
            state.sessionId = action.payload.id
        },
        stopSuccessful(state, action) {
            state.workSessions.unshift(action.payload)
        },
        getWorkSessionsSuccessful(state, action) {
            state.workSessions = action.payload.items;
            state.pagination.page = action.payload.page;
            state.pagination.pageSize = action.payload.pageSize
            state.pagination.totalCount = action.payload.totalCount
            state.pagination.totalPages = action.payload.totalPages
            state.pagination.hasNextPage = action.payload.hasNextPage
            state.pagination.hasPreviousPage = action.payload.hasPreviousPage
        },
        getLastWorkSessionSuccessful(state, { payload }) {
            state.searchingLastSession = false;
            if (!payload) return

            const { id, startTime } = payload;

            state.sessionId = id;
            state.timeStart = startTime;
            state.isTracking = true;
        },
        getLastWorkSessionError(state) {
            state.searchingLastSession = false;
        },
        createWorkSessionSuccessful(state, action) {
            state.workSessions.unshift(action.payload);
        },
        updateWorkSessionSuccessful(state, { payload }) {
            const { id, startTime, endTime, editedAt, editor } = payload;

            const session: WorkSessionModel | undefined = state.workSessions.find((session) => session.id === id);

            if (!session) return

            session.startTime = startTime;
            session.endTime = endTime;
            session.editedAt = editedAt;
            session.editor = editor;
        },
        deleteWorkSessionSuccessful(state, action) {
            state.workSessions = state.workSessions.filter(workSession => workSession.id !== action.payload)
        },
        setIsTracking(state, action) {
            state.isTracking = action.payload
        },
        setSearchingLastSession(state, action) {
            state.searchingLastSession = action.payload
        },
    },
})

export const {
    startSuccessful,
    stopSuccessful,
    getWorkSessionsSuccessful,
    getLastWorkSessionSuccessful,
    getLastWorkSessionError,
    createWorkSessionSuccessful,
    updateWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    setIsTracking,
    setSearchingLastSession
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;
