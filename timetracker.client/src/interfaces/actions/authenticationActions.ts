import {
    authorizeError,
    authorizeSuccessful,
    logoutSuccessful,
    refreshTokenSuccessful,
    createUserPasswordSuccessful,
    setError,
    temporaryLinkValidationError,
    temporaryLinkValidationSuccessful,
    resendCreatePasswordEmailSuccessful,
    resendCreatePasswordEmailError,
} from "@features/authentication/authenticationSlice.ts";
import { AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN, CREATE_USER_PASSWORD } from "@constants";

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

interface AuthorizeErrorAction {
    type: typeof authorizeError.type;
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

interface SetUserPasswordSuccessfulAction {
    type: typeof createUserPasswordSuccessful.type,
}

interface SetUserPasswordAction {
    type: typeof CREATE_USER_PASSWORD,
    payload: {
        password: string,
        temporaryLinkId: string
    }
}

interface TemporaryLinkValidationErrorAction {
    type: typeof temporaryLinkValidationError.type,
    payload: string,
}

interface TemporaryLinkValidationSuccessfulAction {
    type: typeof temporaryLinkValidationSuccessful.type,
}

interface ResendCreatePasswordEmailSuccessfulAction {
    type: typeof resendCreatePasswordEmailSuccessful.type,
    payload: boolean | null,
}

interface ResendCreatePasswordEmailErrorAction {
    type: typeof resendCreatePasswordEmailError.type,
    payload: {
        message: string | null,
        code: string | null,
    } ,
}

export type AuthenticationActions =
    | LoginAction
    | SetErrorAction
    | AuthorizeAction
    | AuthorizeSuccessfulAction
    | AuthorizeErrorAction
    | LogoutAction
    | LogoutSuccessfulAction
    | RefreshTokenAction
    | RefreshTokenSuccessfulAction
    | SetUserPasswordSuccessfulAction
    | SetUserPasswordAction
    | TemporaryLinkValidationErrorAction
    | TemporaryLinkValidationSuccessfulAction
    | ResendCreatePasswordEmailSuccessfulAction
    | ResendCreatePasswordEmailErrorAction