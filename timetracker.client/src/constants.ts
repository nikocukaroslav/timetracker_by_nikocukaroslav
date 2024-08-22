import { GrMoney, GrUserManager, GrUserSettings } from "react-icons/gr";
import { PiTerminalWindowBold } from "react-icons/pi";

export const BASE_URL = "https://localhost:7023/graphql";

export const APPROVE_REQUESTS = "APPROVE_REQUESTS"
export const MANAGE_USERS = "MANAGE_USERS"
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
        name: MANAGE_OWN_TIME,
        description: "manage own time"
    }
];

export const DEVELOPER = "DEVELOPER"
export const MANAGER = "MANAGER"
export const ACCOUNTANT = "ACCOUNTANT"
export const ACCOUNT_MANAGER = "ACCOUNT_MANAGER"

export const positionList = [
    {
        name: DEVELOPER,
        icon: PiTerminalWindowBold,
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
        icon: GrUserSettings,
        description: "Account manager",
        defaultPermissions: [APPROVE_REQUESTS, MANAGE_USERS]
    },
];

export const ON_SICK_LEAVE = "ON_SICK_LEAVE"
export const ON_VACATION = "ON_VACATION"

export const userStatusList = [
    {
        name: ON_SICK_LEAVE,
        description: "On sick leave"
    },
    {
        name: ON_VACATION,
        description: "On vacation"
    }
];

export const AUTOMATIC = "AUTOMATIC"
export const MANUALLY = "MANUALLY"

export const setByList = [
    {
        name: AUTOMATIC,
        description: "automatically",
    },
    {
        name: MANUALLY,
        description: "manually",
    },
];

export const workTime = [
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00'
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
export const CREATE_USER_PASSWORD = "CREATE_USER_PASSWORD"
export const TEMPORARY_LINK_VALIDATION = "TEMPORARY_LINK_VALIDATION"
export const RESEND_CREATE_PASSWORD_EMAIL = "RESEND_CREATE_PASSWORD_EMAIL"

export const START_SESSION = "START_SESSION"
export const STOP_SESSION = "STOP_SESSION"
export const GET_WORK_SESSIONS = "GET_WORK_SESSIONS"
export const GET_LAST_WORK_SESSION = "GET_LAST_WORK_SESSION"
export const CREATE_WORK_SESSION = "CREATE_WORK_SESSION"
export const UPDATE_WORK_SESSION = "UPDATE_WORK_SESSION"
export const DELETE_WORK_SESSION = "DELETE_WORK_SESSION"

export const GET_WORK_DAYS = "GET_WORK_DAYS"
export const CREATE_WORK_DAYS = "CREATE_WORK_DAYS"
export const UPDATE_WORK_DAYS = "UPDATE_WORK_DAYS"
export const DELETE_WORK_DAYS = "DELETE_WORK_DAYS"

