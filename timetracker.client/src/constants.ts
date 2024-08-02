export const BASE_URL = "https://localhost:7023/graphql";

export const APPROVE_REQUESTS = "APPROVE_REQUESTS"
export const MANAGE_USERS = "MANAGE_USERS"
export const MANAGE_TEAMS = "MANAGE_TEAMS"

export const permissionList = [
    {
        name: APPROVE_REQUESTS,
        description: "approve requests",
    },
    {
        name: MANAGE_USERS,
        description: "manage users",
    },
    {
        name: MANAGE_TEAMS,
        description: "manage teams"
    },
];

export const LOGIN = "LOGIN"
export const AUTHORIZE = "AUTHORIZE"
export const LOGOUT = "LOGOUT"
export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const CREATE_USER = "CREATE_USER"
export const GET_USERS = "GET_USERS"
export const GET_USER = "GET_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER_PERMISSIONS = "UPDATE_USER_PERMISSIONS"

