import {
    AUTHORIZE,
    CREATE_USER_PASSWORD,
    LOGIN,
    LOGOUT,
    REFRESH_TOKEN,
    RESEND_CREATE_PASSWORD_EMAIL,
    RESET,
    TEMPORARY_LINK_VALIDATION,
} from "@constants";

export const login = (email: string, password: string) => ({ type: LOGIN, payload: { email, password } })
export const authorize = () => ({ type: AUTHORIZE })
export const logout = () => ({ type: LOGOUT })
export const refreshToken = () => ({ type: REFRESH_TOKEN })
export const reset = () => ({ type: RESET })
export const createUserPassword = (password: string, temporaryLinkId: string) => ({
    type: CREATE_USER_PASSWORD,
    payload: { password, temporaryLinkId }
})
export const temporaryLinkValidation = (temporaryLinkId: string) => ({
    type: TEMPORARY_LINK_VALIDATION,
    payload: temporaryLinkId
})
export const resendCreatePasswordEmail = (temporaryLinkId: string) => ({
    type: RESEND_CREATE_PASSWORD_EMAIL,
    payload: temporaryLinkId
})