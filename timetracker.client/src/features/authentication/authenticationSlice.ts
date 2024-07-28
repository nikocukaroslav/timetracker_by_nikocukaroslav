import {createSlice} from "@reduxjs/toolkit";
import {LOGIN} from "../../constants.ts";

export const initialState = {
    userId: localStorage.getItem("userId") || "",
    userName: localStorage.getItem("userName") || "",
    userAvatar: "",
    userPermissions: localStorage.getItem("userPermissions") || ["MANAGE_TEAMS"],
    loginStatus: localStorage.getItem("loginStatus") || false,
    loading: false,
    error: "",
}


export const login = (email: string, password: string) => ({type: LOGIN, payload: {email, password}})

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        loginUser(state, {payload}) {
            state.userId = payload.user.id;
            state.userName = payload.user.name;
            state.userPermissions = payload.user.permissions;
            state.loginStatus = true;
            localStorage.setItem("token", payload.token)
            localStorage.setItem("userId", payload.user.id)
            localStorage.setItem("userName", payload.user.name)
            localStorage.setItem("userPermissions", JSON.stringify(payload.user.permissions))
            localStorage.setItem("loginStatus", "true")
        },
        resetLoginStatus(state) {
            state.userId = "";
            state.userName = "";
            state.userPermissions = "";
            state.loginStatus = false;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("userPermissions");
            localStorage.removeItem("loginStatus");
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
})

export const {loginUser, resetLoginStatus, setLoading, setError} = authenticationSlice.actions;

export default authenticationSlice.reducer;
