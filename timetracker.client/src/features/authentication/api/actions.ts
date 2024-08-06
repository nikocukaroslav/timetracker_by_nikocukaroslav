import {AUTHORIZE, LOGIN, LOGOUT, REFRESH_TOKEN} from "../../../constants.ts";

export const login = (email: string, password: string) => ({type: LOGIN, payload: {email, password}})
export const authorize = () => ({type: AUTHORIZE})
export const logout = () => ({type: LOGOUT})
export const refreshToken = () => ({type: REFRESH_TOKEN})
