import {createSlice} from "@reduxjs/toolkit";
import {deleteCookie, setCookie} from "../../utils/cookieHandlers.ts";

export const initialState = {
    userId: "",
    userName: "",
    userAvatar: "",
    userPermissions: [],
    userPosition: "",
    loading: false,
    error: "",
    expiresAt: null,
    loginStatus: false,
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authorizeSuccessful(state, {payload}) {
            state.userId = payload.user.id;
            state.userName = payload.user.name;
            state.userPermissions = payload.user.permissions;
            state.userPosition = payload.user.position;
            state.expiresAt = payload.accessToken.expiresAt;
            state.loginStatus = true;
            setCookie("refreshToken", payload.refreshToken.token, payload.refreshToken.expiresAt)
            localStorage.setItem("token", payload.accessToken.token)
        },
        refreshTokenSuccessful(state, {payload}) {
            console.log(payload)
            localStorage.setItem("token", payload.refreshToken.accessToken.token)
            setCookie("refreshToken", payload.refreshToken.refreshToken.token, payload.refreshToken.refreshToken.expiresAt)
            state.expiresAt = payload.refreshToken.accessToken.expiresAt;
        },
        logoutSuccessful(state) {
            state.userId = "";
            state.userName = "";
            state.userPermissions = [];
            state.userPosition = "";
            state.loginStatus = false;
            deleteCookie("refreshToken")
            localStorage.removeItem("token");
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
