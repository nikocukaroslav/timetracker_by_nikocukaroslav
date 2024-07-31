import {createSlice} from "@reduxjs/toolkit";
import {AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN} from "../../constants.ts";

export const initialState = {
    userId: "",
    userName: "",
    userAvatar: "",
    userPermissions: [],
    loading: false,
    error: "",
    expiresAt: null,
    loginStatus: localStorage.getItem("loginStatus") || false
}

export const login = (email: string, password: string) => ({type: LOGIN, payload: {email, password}})
export const authorize = () => ({type: AUTHORIZE})
export const logout = () => ({type: LOGOUT})
export const refreshToken = () => ({type: REFRESH_TOKEN})

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        loginUser(state, {payload}) {
            state.userId = payload.user.id;
            state.userName = payload.user.name;
            state.userPermissions = payload.user.permissions;
            state.expiresAt = payload.accessToken.expiresAt;
            state.loginStatus = true;
            localStorage.setItem("loginStatus", "true");
            localStorage.setItem("token", payload.accessToken.token)
        },
        silentLogin(state, {payload}) {
            console.log(payload)
            localStorage.setItem("token", payload.refreshToken.token)
            state.expiresAt = payload.refreshToken.expiresAt;
        },
        logoutUser(state) {
            state.userId = "";
            state.userName = "";
            state.userPermissions = [];
            state.loginStatus = false;
            localStorage.removeItem("loginStatus");
            localStorage.removeItem("token");
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload;
        },
        authorizeUser(state, {payload}) {
            state.userId = payload.id;
            state.userName = payload.name;
            state.userPermissions = payload.permissions;
        }
    },
})

export const {loginUser, logoutUser, setLoading, setError, authorizeUser, silentLogin} = authenticationSlice.actions;

export default authenticationSlice.reducer;
