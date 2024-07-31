import {getUsers} from "../features/employees/employeesSlice.ts";
import store from "../store.ts";
import {authorize} from "../features/authentication/authenticationSlice.ts";

export function employeesLoader() {
    return store.dispatch(getUsers());
}

export function userLoader() {
    return store.dispatch(authorize(localStorage.getItem("token")))
}