export const BASE_URL = "https://localhost:7023/graphql";

export const APPROVE_REQUESTS = "APPROVE_REQUESTS"
export const MANAGE_USERS = "MANAGE_USERS"
export const MANAGE_TEAMS = "MANAGE_TEAMS"
export const WORKING_PART_TIME = "WORKING_PART_TIME"

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
export const CREATE_USER = "CREATE_USER"
export const GET_USERS = "GET_USERS"
export const DELETE_USER = "DELETE_USER"
