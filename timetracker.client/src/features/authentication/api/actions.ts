import { AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN, CREATE_USER_PASSWORD } from "@constants";

export const login = (email: string, password: string) => ({type: LOGIN, payload: {email, password}})
export const authorize = () => ({type: AUTHORIZE})
export const logout = () => ({type: LOGOUT})
export const refreshToken = () => ({type: REFRESH_TOKEN})
export const createUserPassword = (password : string, temporaryLinkId: string) => ({type: CREATE_USER_PASSWORD, payload: {password, temporaryLinkId}})
