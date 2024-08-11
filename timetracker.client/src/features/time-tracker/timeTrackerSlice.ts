import { createSlice } from "@reduxjs/toolkit";

import { WorkSessionModel } from "@interfaces/domain.ts";
import { TimeTrackerState } from "@interfaces/state.ts";

const initialState: TimeTrackerState = {
    workSessions: [],
    sessionId: null,
    isTracking: false,
    currentTime: 0,
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
            state.workSessions = action.payload
        },
        getLastWorkSessionSuccessful(state, action) {
            if (!action.payload) return
            state.sessionId = action.payload.id;
            state.currentTime = Math.floor((Date.now() - action.payload.startTime) / 1000);
            state.isTracking = true;
        },
        addWorkSessionSuccessful(state, action) {
            state.workSessions.unshift(action.payload);
        },
        editWorkSessionSuccessful(state, {payload}) {
            const {id, startTime, endTime, editedAt, editor} = payload;

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
        setTime(state, action) {
            state.currentTime = action.payload;
        },
        setIsTracking(state, action) {
            state.isTracking = action.payload
        },
    },
})

export const {
    startSuccessful,
    stopSuccessful,
    getWorkSessionsSuccessful,
    getLastWorkSessionSuccessful,
    addWorkSessionSuccessful,
    editWorkSessionSuccessful,
    deleteWorkSessionSuccessful,
    setIsTracking,
    setTime
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;
