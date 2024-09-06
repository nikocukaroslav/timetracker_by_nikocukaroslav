import { createSlice } from "@reduxjs/toolkit";

import { ActionsState } from "@interfaces/state.ts";

export const initialState: ActionsState = {
    actions: {},
}

const actionsSlice = createSlice({
    name: "actionsState",
    initialState,
    reducers: {
        resetAction(state, { payload }) {
            state.actions[payload] = {
                fulfilled: false,
                loading: true,
                error: null,
            };
        },
        setFulfilled(state, { payload }) {
            state.actions[payload].loading = false;
            state.actions[payload].fulfilled = true;
        },
        setError(state, { payload }) {
            const { type, error } = payload;

            if (error) {
                const errorCode = error.extensions.code;

                state.actions[type].error = {
                    message: error.message,
                    code: errorCode !== "" ? errorCode : "UNKNOWN_ERROR",
                };
            }
        },
    },
})

export const {
    resetAction,
    setFulfilled,
    setError,
} = actionsSlice.actions;

export default actionsSlice.reducer;
