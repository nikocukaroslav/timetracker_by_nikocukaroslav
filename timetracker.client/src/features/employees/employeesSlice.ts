import {createSlice} from "@reduxjs/toolkit";
import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../../constants.ts";
import {User} from "../../interfaces/domain.ts";

export const initialState = {
    user: {},
    users: [],
    loading: false,
    status: ""
}

export const createUser = (newUser: User) => ({type: CREATE_USER, payload: newUser})
export const getUsers = () => ({type: GET_USERS})
export const getUser = (userId: string) => ({type: GET_USER, payload: userId})
export const deleteUser = (userId: string) => ({type: DELETE_USER, payload: userId})
export const updateUser = (userToUpdate: User) => ({
    type: UPDATE_USER,
    payload: userToUpdate
})

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        create(state, action) {
            state.users.push(action.payload)
        },
        update(state, action) {
            const userToUpdate = state.users.find(user => user.id === action.payload.id)
            userToUpdate.permissions = action.payload.permissions
            userToUpdate.timeload = action.payload.timeload
            userToUpdate.position = action.payload.position
        },
        remove(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setUsers(state, action) {
            state.users = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    },
})

export const {create, setUsers, remove, setLoading, setUser, update} = employeesSlice.actions;

export default employeesSlice.reducer;
