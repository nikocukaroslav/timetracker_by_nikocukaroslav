import { createSlice } from "@reduxjs/toolkit";

import { CalendarState } from "@features/calendar/types/state.ts";

const initialState: CalendarState = {
    workDays: [],
    user: null,
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getWorkDaysSuccessful(state, { payload }) {
            const { workDays, user } = payload;

            state.workDays = workDays
            state.user = user;
        },
        createWorkDaysSuccessful(state, { payload }) {
            state.workDays = state.workDays.concat(payload);
        },
        updateWorkDaySuccessful(state, { payload }) {
            const { id, startTime, endTime } = payload;

            const workDayToUpdate = state.workDays.find(workDay => workDay.id === id)

            if (!workDayToUpdate) return

            workDayToUpdate.startTime = startTime;
            workDayToUpdate.endTime = endTime;
        },
        deleteWorkDaySuccessful(state, { payload }) {
            state.workDays = state.workDays.filter(workDay => workDay.id !== payload)
        },
    },
})

export const {
    getWorkDaysSuccessful,
    createWorkDaysSuccessful,
    updateWorkDaySuccessful,
    deleteWorkDaySuccessful,
} = calendarSlice.actions;

export default calendarSlice.reducer;
