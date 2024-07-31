import {createSlice} from "@reduxjs/toolkit";
import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER_PERMISSIONS} from "../../constants.ts";

export const initialState = {
    user: {},
    users: [],
    loading: false,
    status: ""
}

export const createUser = (newUser: object) => ({type: CREATE_USER, payload: newUser})
export const getUsers = () => ({type: GET_USERS})
export const getUser = (userId: string) => ({type: GET_USER, payload: userId})
export const deleteUser = (userId: string) => ({type: DELETE_USER, payload: userId})
export const updateUserPermissions = ({permissions, userId: id}) => ({
    type: UPDATE_USER_PERMISSIONS,
    payload: {permissions, id}
})

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload)
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setUsers(state, action) {
            state.users = action.payload
        },
        updateUser(state, action) {
            const userToUpdate = state.users.find(user => user.id === action.payload.id)
            userToUpdate.permissions = action.payload.permissions
        },
        removeUser(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    },
})

export const {addUser, setUsers, removeUser, setLoading, setUser, updateUser} = employeesSlice.actions;

export default employeesSlice.reducer;
