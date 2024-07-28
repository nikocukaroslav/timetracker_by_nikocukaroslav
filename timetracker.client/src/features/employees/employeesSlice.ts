import {createSlice} from "@reduxjs/toolkit";
import {CREATE_USER, DELETE_USER, GET_USERS} from "../../constants.ts";


export const initialState = {
    users: [],
    loading: false,
}


export const createUser = (newUser: object) => ({type: CREATE_USER, payload: newUser})
export const getUsers = () => ({type: GET_USERS})
export const deleteUser = (userId: string) => ({type: DELETE_USER, payload: userId})

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload)
        },
        setUsers(state, action) {
            state.users = action.payload
        },
        removeUser(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    },
})

export const {addUser, setUsers, removeUser, setLoading} = authenticationSlice.actions;

export default authenticationSlice.reducer;
