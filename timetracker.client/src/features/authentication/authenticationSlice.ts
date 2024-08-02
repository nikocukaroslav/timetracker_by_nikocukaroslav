import {createSlice} from "@reduxjs/toolkit";
import {AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN} from "../../constants.ts";
import {deleteCookie, setCookie} from "../../utils/cookieHandler.ts";

export const initialState = {
    userId: "",
    userName: "",
    userAvatar: "",
    userPermissions: [],
    userType: "",
    loading: false,
    error: "",
    expiresAt: null,
    loginStatus: false
}

export const login = (email: string, password: string) => ({type: LOGIN, payload: {email, password}})
export const authorize = () => ({type: AUTHORIZE})
export const logout = () => ({type: LOGOUT})
export const refreshToken = () => ({type: REFRESH_TOKEN})

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authorizeUser(state, {payload}) {
            state.userId = payload.user.id;
            state.userName = payload.user.name;
            state.userPermissions = payload.user.permissions;
            state.expiresAt = payload.accessToken.expiresAt;
            state.loginStatus = true;
            setCookie("refreshToken", payload.refreshToken.token, payload.refreshToken.expiresAt)
            localStorage.setItem("token", payload.accessToken.token)
        },
        silentTokenRefresh(state, {payload}) {
            localStorage.setItem("token", payload.refreshToken.token)
            state.expiresAt = payload.refreshToken.expiresAt;
        },
        logoutUser(state) {
            state.userId = "";
            state.userName = "";
            state.userPermissions = [];
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
    logoutUser,
    setLoading,
    setError,
    authorizeUser,
    silentTokenRefresh
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
