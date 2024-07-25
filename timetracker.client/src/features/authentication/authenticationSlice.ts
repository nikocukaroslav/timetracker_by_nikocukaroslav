import {createSlice} from "@reduxjs/toolkit";
import {LOGIN} from "../../constants.ts";

export const initialState = {
    userId: "",
    userName: "",
    userAvatar: "",
    userPermissions: [],
    userType: "",
    loginStatus: false,
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
        }
    },
})

export const {loginUser} = authenticationSlice.actions;

export default authenticationSlice.reducer;
