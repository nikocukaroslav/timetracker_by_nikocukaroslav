import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import {
    authorizeEpic,
    createUserPasswordEpic,
    loginEpic,
    logoutEpic,
    refreshTokenEpic,
    resendCreatePasswordEmailEpic,
    temporaryLinkValidationEpic,
} from "@features/authentication/api/epics.ts";
import {
    createUserEpic,
    deleteUserEpic,
    getUserEpic,
    getUsersEpic,
    updateUserEpic,
} from "@features/employees/api/epics.ts";
import {
    createWorkSessionEpic,
    deleteWorkSessionEpic,
    getLastWorkSessionEpic,
    getWorkSessionsEpic,
    startSessionEpic,
    stopSessionEpic,
    updateWorkSessionEpic,
} from "@features/time-tracker/api/epics.ts";
import {
    createWorkDaysEpic,
    deleteWorkDayEpic,
    getWorkDaysEpic,
    updateWorkDayEpic
} from "@features/calendar/api/epics.ts";
import { createRoleEpic, deleteRoleEpic, getRolesEpic, updateRoleEpic } from "@features/roles/api/epics.ts";

import authenticationReducer from "@features/authentication/authenticationSlice.ts";
import employeesReducer from "@features/employees/employeesSlice.ts";
import timeTrackerReducer from "@features/time-tracker/timeTrackerSlice.ts";
import calendarReducer from "@features/calendar/calendarSlice.ts";
import rolesReducer from "@features/roles/rolesSlice.ts";
import actionsStateReducer from "./slices/actionsStateSlice.ts";
import reportsReducer from "@features/reports/reportsSlice.ts"
import { getReportsEpic } from "@features/reports/api/epics.ts";

const epics = [
    loginEpic,
    authorizeEpic,
    logoutEpic,
    refreshTokenEpic,
    createUserPasswordEpic,
    temporaryLinkValidationEpic,
    resendCreatePasswordEmailEpic,
    createUserEpic,
    getUsersEpic,
    getUserEpic,
    deleteUserEpic,
    updateUserEpic,
    startSessionEpic,
    stopSessionEpic,
    getWorkSessionsEpic,
    getLastWorkSessionEpic,
    createWorkSessionEpic,
    updateWorkSessionEpic,
    deleteWorkSessionEpic,
    getWorkDaysEpic,
    createWorkDaysEpic,
    updateWorkDayEpic,
    deleteWorkDayEpic,
    getRolesEpic,
    deleteRoleEpic,
    createRoleEpic,
    updateRoleEpic,
    getReportsEpic
]

const epicMiddleware = createEpicMiddleware();

const appReducer = combineReducers({
    authentication: authenticationReducer,
    employees: employeesReducer,
    reports: reportsReducer,
    timeTracker: timeTrackerReducer,
    calendar: calendarReducer,
    roles: rolesReducer,
    actionsState: actionsStateReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware),
});

const rootEpic = combineEpics(...epics);
epicMiddleware.run(rootEpic);

export default store;
