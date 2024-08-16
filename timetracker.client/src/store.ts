import { configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { authorizeEpic, loginEpic, logoutEpic, refreshTokenEpic } from "./features/authentication/api/epics.ts";
import {
    createUserEpic,
    deleteUserEpic,
    getUserEpic,
    getUsersEpic,
    updateUserEpic
} from "./features/employees/api/epics.ts";
import {
    createWorkSessionEpic,
    deleteWorkSessionEpic,
    updateWorkSessionEpic,
    getLastWorkSessionEpic,
    getWorkSessionsEpic,
    startSessionEpic,
    stopSessionEpic,
} from "./features/time-tracker/api/epics.ts";
import {
    createWorkDaysEpic,
    deleteWorkDayEpic,
    getWorkDaysEpic,
    updateWorkDayEpic
} from "@features/calendar/api/epics.ts";

import authenticationReducer from "./features/authentication/authenticationSlice.ts";
import employeesReducer from "./features/employees/employeesSlice.ts";
import timeTrackerReducer from "./features/time-tracker/timeTrackerSlice.ts";
import calendarReducer from "./features/calendar/calendarSlice.ts";

const epics = [
    loginEpic,
    authorizeEpic,
    logoutEpic,
    refreshTokenEpic,
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
    deleteWorkDayEpic
]

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        employees: employeesReducer,
        timeTracker: timeTrackerReducer,
        calendar: calendarReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware),
});

const rootEpic = combineEpics(...epics);
epicMiddleware.run(rootEpic);

export default store;
