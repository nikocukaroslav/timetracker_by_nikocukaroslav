import {AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN} from "../../constants.ts";
import {
    authorizeUser,
    logoutUser,
    setError,
    silentTokenRefresh
} from "../../features/authentication/authenticationSlice.ts";

export interface LoginAction {
    type: typeof LOGIN;
    payload: {
        email: string,
        password: string
    }
}

export interface SetErrorAction {
    type: typeof setError.type;
    payload: string
}

export interface AuthorizeAction {
    type: typeof AUTHORIZE;
}

export interface AuthorizeUserAction {
    type: typeof authorizeUser.type;
    payload: object;
}

export interface LogoutAction {
    type: typeof LOGOUT,
}

export interface LogoutUserAction {
    type: typeof logoutUser.type,
}

export interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN,
}

export interface SilentRefreshToken {
    type: typeof silentTokenRefresh.type,
}

export type AuthenticationActions =
    | LoginAction
    | SetErrorAction
    | AuthorizeAction
    | AuthorizeUserAction
    | LogoutAction
    | LogoutUserAction
    | RefreshTokenAction
    | SilentRefreshToken