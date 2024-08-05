import {createSlice} from "@reduxjs/toolkit";
import {START_SESSION} from "../../constants.ts";


export const initialState = {
    sessionId: "",
}

export const startSession = ({userId, startTime}) => ({type: START_SESSION, payload: {userId, startTime}})
export const stopSession = ({sessionId, endTime}) => ({type: START_SESSION, payload: {sessionId, endTime}})

const employeesSlice = createSlice({
    name: "timeTracker",
    initialState,
    reducers: {
        start(state, action) {
            state.sessionId = action.payload
        },
        stop(state, action) {
            state.sessionId = action.payload
        }
    },
})

export const {start, stop} = employeesSlice.actions;

export default employeesSlice.reducer;
