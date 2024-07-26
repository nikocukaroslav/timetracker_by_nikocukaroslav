import {createSlice} from "@reduxjs/toolkit";
import {LOGIN} from "../../constants.ts";

export const initialState = {
    userId: localStorage.getItem("userId") || "",
    userName: localStorage.getItem("userName") || "",
    userAvatar: "",
    userPermissions: localStorage.getItem("userPermissions") || [],
    userType: localStorage.getItem("userType") || "",
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
            state.userId = payload.id;
            state.userName = payload.name;
            state.userType = payload.employeeType
            state.userPermissions = payload.permissions;
            state.loginStatus = true;
            localStorage.setItem("token", payload.login)
            localStorage.setItem("userId", payload.id)
            localStorage.setItem("userName", payload.name)
            localStorage.setItem("userType", payload.employeeType)
            localStorage.setItem("userPermissions", JSON.stringify(payload.permissions))
            localStorage.setItem("loginStatus", "true")
        },
        resetLoginStatus(state) {
            state.userId = "";
            state.userName = "";
            state.userType = "";
            state.userPermissions = "";
            state.loginStatus = false;
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("userType");
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
