import { createSlice } from "@reduxjs/toolkit";

import { WorkSessionModel } from "@interfaces/domain.ts";
import { TimeTrackerState } from "@interfaces/state.ts";

const initialState: TimeTrackerState = {
    workSessions: [],
    sessionId: null,
    isTracking: false,
    startTime: null,
    pagination: {
        pageSize: Number(localStorage.getItem("trackerPageSize")) || 20,
    },
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
            if (!payload) return

            const { id, startTime } = payload;

            state.sessionId = id;
            state.startTime = startTime;
            state.isTracking = true;
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
        setStartTracking(state, { payload }) {
            state.isTracking = true;
            state.startTime = payload;
        },
        setStopTracking(state) {
            state.isTracking = false;
            state.startTime = null;
        },
    },
})

export const {
    startSuccessful,
    stopSuccessful,
    getWorkSessionsSuccessful,
    getLastWorkSessionSuccessful,
    createWorkSessionSuccessful,
    updateWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    setStartTracking,
    setStopTracking,
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;
