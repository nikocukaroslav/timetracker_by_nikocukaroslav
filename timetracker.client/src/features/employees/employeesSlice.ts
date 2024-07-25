import {createSlice} from "@reduxjs/toolkit";
import {CREATE_USER} from "../../constants.ts";


export const initialState = {
    user: {},
}


export const createUser = (newUser: object) => ({type: CREATE_USER, payload: newUser})

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        addUser(state, {payload}) {
            state.user = payload;
        }
    },
})

export const {addUser} = authenticationSlice.actions;

export default authenticationSlice.reducer;
