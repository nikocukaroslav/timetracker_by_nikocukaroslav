import {
    AUTHORIZE,
    CREATE_USER,
    DELETE_USER,
    GET_USER,
    GET_USERS,
    LOGIN,
    LOGOUT,
    REFRESH_TOKEN,
    UPDATE_USER_PERMISSIONS
} from "../constants.ts";
import {removeUser, setUser, setUsers, updateUser} from "../features/employees/employeesSlice.ts";
import {
    authorizeUser,
    logoutUser,
    setError,
    silentTokenRefresh
} from "../features/authentication/authenticationSlice.ts";

export interface User {
    id: string,
    name: string,
    surname: string,
    email: string,
    employeeType: string,
    permissions: string[],
}


interface CreateUserAction {
    type: typeof CREATE_USER;
    payload: User;
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

interface RemoveUserAction {
    type: typeof removeUser.type;
    payload: string
}

interface UpdateUserPermissionsAction {
    type: typeof UPDATE_USER_PERMISSIONS;
    payload: {
        permissions: [];
        id: string;
    };
}

interface SetUsersAction {
    type: typeof setUsers.type;
    payload: []
}

interface SetUserAction {
    type: typeof setUser.type;
    payload: object;
}

interface UpdateUserAction {
    type: typeof updateUser.type;
    payload: object
}

interface LoginAction {
    type: typeof LOGIN;
    payload: {
        email: string,
        password: string
    }
}

interface SetErrorAction {
    type: typeof setError.type;
    payload: string
}

interface AuthorizeAction {
    type: typeof AUTHORIZE;
}

interface AuthorizeUserAction {
    type: typeof authorizeUser.type;
    payload: object;
}

interface LogoutAction {
    type: typeof LOGOUT,
}

interface LogoutUserAction {
    type: typeof logoutUser.type,
}

interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN,
}

interface SilentRefreshToken {
    type: typeof silentTokenRefresh.type,
}

export type MyAction =
    CreateUserAction
    | GetUsersAction
    | GetUserAction
    | SetUsersAction
    | SetUserAction
    | UpdateUserAction
    | DeleteUserAction
    | RemoveUserAction
    | UpdateUserPermissionsAction
    | LoginAction
    | SetErrorAction
    | AuthorizeAction
    | AuthorizeUserAction
    | LogoutAction
    | LogoutUserAction
    | RefreshTokenAction
    | SilentRefreshToken
