import { createSlice } from "@reduxjs/toolkit";

import { deleteCookie, setCookie } from "@utils/cookieHandlers.ts";
import { AuthenticationState } from "@interfaces/state.ts";

export const initialState: AuthenticationState = {
    user: null,
    accessToken: null,
    expiresAt: null,
    error: null,
    loading: false,
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authorizeSuccessful(state, {payload}) {
            state.user = payload.user;
            state.expiresAt = payload.accessToken.expiresAt;
            state.accessToken = payload.accessToken.token
            setCookie("refreshToken", payload.refreshToken.token, payload.refreshToken.expiresAt)
        },
        refreshTokenSuccessful(state, {payload}) {
            state.accessToken = payload.refreshToken.accessToken.token;
            state.expiresAt = payload.refreshToken.accessToken.expiresAt;
            setCookie("refreshToken", payload.refreshToken.refreshToken.token, payload.refreshToken.refreshToken.expiresAt)
        },
        logoutSuccessful(state) {
            state.user = null
            state.accessToken = null
            deleteCookie("refreshToken")
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
})

export const {
    logoutSuccessful,
    setLoading,
    setError,
    authorizeSuccessful,
    refreshTokenSuccessful
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
