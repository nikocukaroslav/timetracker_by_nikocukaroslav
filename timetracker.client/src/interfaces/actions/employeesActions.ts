import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../../constants.ts";
import {
    deleteSuccessful,
    getUsersSuccessful,
    getUserSuccessful,
    updateSuccessful
} from "../../features/employees/employeesSlice.ts";
import {UserModel} from "../domain.ts";

interface CreateUserAction {
    type: typeof CREATE_USER;
    payload: UserModel;
}

interface GetUsersAction {
    type: typeof GET_USERS;
}

interface GetUserAction {
    type: typeof GET_USER;
    payload: string;
}

interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: string;
}

interface DeleteSuccessfulAction {
    type: typeof deleteSuccessful.type;
    payload: string
}

interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: {
        permissions: [];
        timeload: number;
        id: string;
    };
}

interface UpdateSuccessfulAction {
    type: typeof updateSuccessful.type;
    payload: object
}

interface GetUsersSuccessfulAction {
    type: typeof getUsersSuccessful.type;
    payload: []
}

interface GetUserSuccessfulAction {
    type: typeof getUserSuccessful.type;
    payload: object;
}

export type EmployeesActions =
    CreateUserAction
    | GetUsersAction
    | GetUserAction
    | GetUsersSuccessfulAction
    | GetUserSuccessfulAction
    | DeleteUserAction
    | DeleteSuccessfulAction
    | UpdateUserAction
    | UpdateSuccessfulAction