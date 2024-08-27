import {
    getUsersSuccessful,
    getUserSuccessful,
} from "@features/employees/employeesSlice.ts";
import { UserFilterModel, UserModel, PaginationModel } from "../domain.ts";
import { CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER } from "@constants";

interface CreateUserAction {
    type: typeof CREATE_USER;
    payload: UserModel;
}

interface GetUsersAction {
    type: typeof GET_USERS;
    payload: {
        pagination: PaginationModel,
        filter?: UserFilterModel,
    }
}

interface GetUserAction {
    type: typeof GET_USER;
    payload: string;
}

interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: string;
}

interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: {
        id: string;
        name: string;
        surname: string;
        position: string;
        permissions: [];
        timeload: string;
    };
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
    | UpdateUserAction