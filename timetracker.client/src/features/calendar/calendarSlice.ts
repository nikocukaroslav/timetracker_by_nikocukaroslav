import { createSlice } from "@reduxjs/toolkit";

import { CalendarState } from "@interfaces/state.ts";

const initialState: CalendarState = {
    workDays: [],
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        getWorkDaysSuccessful(state, { payload }) {
            state.workDays = payload;
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
    deleteWorkDaySuccessful
} = calendarSlice.actions;

export default calendarSlice.reducer;
