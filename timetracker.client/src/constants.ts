import { GrMoney, GrUserManager } from "react-icons/gr";
import { PiCode, PiUserCircleGearLight } from "react-icons/pi";

export const BASE_URL = "https://localhost:7023/graphql";

export const APPROVE_REQUESTS = "APPROVE_REQUESTS"
export const MANAGE_USERS = "MANAGE_USERS"
export const MANAGE_TEAMS = "MANAGE_TEAMS"
export const MANAGE_OWN_TIME = "MANAGE_OWN_TIME"

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
    {
        name: MANAGE_OWN_TIME,
        description: "manage own time"
    }
];

export const DEVELOPER = "DEVELOPER"
export const MANAGER = "MANAGER"
export const ACCOUNTANT = "ACCOUNTANT"
export const ACCOUNT_MANAGER = "ACCOUNT_MANAGER"

export const positionsList = [
    {
        name: DEVELOPER,
        icon: PiCode,
        description: "Developer",
        defaultPermissions: [MANAGE_OWN_TIME]
    },
    {
        name: MANAGER,
        icon: GrUserManager,
        description: "Manager",
        defaultPermissions: [MANAGE_USERS]
    },
    {
        name: ACCOUNTANT,
        icon: GrMoney,
        description: "Accountant",
        defaultPermissions: [APPROVE_REQUESTS]
    },
    {
        name: ACCOUNT_MANAGER,
        icon: PiUserCircleGearLight,
        description: "Account manager",
        defaultPermissions: [APPROVE_REQUESTS, MANAGE_USERS]
    },
];

export const SYSTEM = "SYSTEM"
export const MANUALLY = "MANUALLY"

export const setByList = [
    {
        name: SYSTEM,
        description: "by system",
    },
    {
        name: MANUALLY,
        description: "manually",
    }
];

export const LOGIN = "LOGIN"
export const AUTHORIZE = "AUTHORIZE"
export const LOGOUT = "LOGOUT"
export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const CREATE_USER = "CREATE_USER"
export const GET_USERS = "GET_USERS"
export const GET_USER = "GET_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"
export const START_SESSION = "START_SESSION"
export const STOP_SESSION = "STOP_SESSION"
export const GET_SESSIONS = "GET_SESSIONS"
export const GET_LAST_WORK_SESSION = "GET_LAST_WORK_SESSION"
export const ADD_WORK_SESSION = "ADD_WORK_SESSION"
export const EDIT_WORK_SESSION = "EDIT_WORK_SESSION"
export const DELETE_WORK_SESSION = "DELETE_WORK_SESSION"

