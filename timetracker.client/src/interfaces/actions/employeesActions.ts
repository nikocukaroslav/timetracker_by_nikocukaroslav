import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../../constants.ts";
import {remove, setUser, setUsers, update} from "../../features/employees/employeesSlice.ts";
import {User} from "../domain.ts";

export interface CreateUserAction {
    type: typeof CREATE_USER;
    payload: User;
}

export interface GetUsersAction {
    type: typeof GET_USERS;
}

export interface GetUserAction {
    type: typeof GET_USER;
    payload: string;
}

export interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: string;
}

export interface RemoveAction {
    type: typeof remove.type;
    payload: string
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: {
        permissions: [];
        timeload: number;
        id: string;
    };
}

export interface UpdateAction {
    type: typeof update.type;
    payload: object
}

export interface SetUsersAction {
    type: typeof setUsers.type;
    payload: []
}

export interface SetUserAction {
    type: typeof setUser.type;
    payload: object;
}

export type EmployeesActions =
    CreateUserAction
    | GetUsersAction
    | GetUserAction
    | SetUsersAction
    | SetUserAction
    | DeleteUserAction
    | RemoveAction
    | UpdateUserAction
    | UpdateAction