import {
    authorizeSuccessful,
    logoutSuccessful,
    refreshTokenSuccessful,
    setError
} from "@features/authentication/authenticationSlice.ts";
import { AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN } from "@constants";

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

interface AuthorizeSuccessfulAction {
    type: typeof authorizeSuccessful.type;
    payload: object;
}

interface LogoutAction {
    type: typeof LOGOUT,
}

interface LogoutSuccessfulAction {
    type: typeof logoutSuccessful.type,
}

interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN,
}

interface RefreshTokenSuccessfulAction {
    type: typeof refreshTokenSuccessful.type,
}

export type AuthenticationActions =
    | LoginAction
    | SetErrorAction
    | AuthorizeAction
    | AuthorizeSuccessfulAction
    | LogoutAction
    | LogoutSuccessfulAction
    | RefreshTokenAction
    | RefreshTokenSuccessfulAction