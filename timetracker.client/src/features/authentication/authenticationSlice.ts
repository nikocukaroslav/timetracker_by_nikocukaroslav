import { createSlice } from "@reduxjs/toolkit";

import { deleteCookie, setCookie } from "@utils/cookieHandlers.ts";
import { AuthenticationState } from "@interfaces/state.ts";

export const initialState: AuthenticationState = {
    user: null,
    accessToken: null,
    expiresAt: null,
    error: null,
    authenticating: true,
    loading: false,
    setPasswordResult: false,
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authorizeSuccessful(state, {payload}) {
            const {user, accessToken, refreshToken} = payload;

            state.authenticating = false;
            state.user = user;
            state.expiresAt = accessToken.expiresAt;
            state.accessToken = accessToken.token;
            if (refreshToken)
                setCookie("refreshToken", refreshToken.token, refreshToken.expiresAt);
        },
        authorizeError(state) {
            state.authenticating = false;
            state.user = null;
            state.accessToken = null;
            state.expiresAt = null;
            deleteCookie("refreshToken");
        },
        refreshTokenSuccessful(state, {payload}) {
            const {accessToken, refreshToken} = payload.refreshToken;

            state.accessToken = accessToken.token;
            state.expiresAt = accessToken.expiresAt;
            setCookie("refreshToken", refreshToken.token, refreshToken.expiresAt)
        },
        logoutSuccessful(state) {
            state.user = null;
            state.accessToken = null;
            state.expiresAt = null;
            deleteCookie("refreshToken");
        },
        setAuthenticating(state, {payload}) {
            state.authenticating = payload;
        },
        setLoading(state, {payload}) {
            state.loading = payload;
        },
        setError(state, {payload}) {
            state.error = payload;
        },
        createUserPasswordSuccessful(state, {payload}){
            state.setPasswordResult = payload.createPassword;
        },
    },
})

export const {
    logoutSuccessful,
    setAuthenticating,
    setLoading,
    setError,
    authorizeSuccessful,
    authorizeError,
    refreshTokenSuccessful,
    createUserPasswordSuccessful
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
