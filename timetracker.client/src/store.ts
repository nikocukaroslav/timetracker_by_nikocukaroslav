import {configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import authenticationReducer from "./features/authentication/authenticationSlice.ts";
import {authorizeEpic, loginEpic, logoutEpic, refreshTokenEpic} from "./features/authentication/api/epics.ts";
import {
    createUserEpic,
    deleteUserEpic,
    getUserEpic,
    getUsersEpic,
    updateUserEpic
} from "./features/employees/api/epics.ts";
import employeesReducer from "./features/employees/employeesSlice.ts";
import timeTrackerReducer from "./features/time-tracker/timeTrackerSlice.ts";
import {
    getLastWorkSessionEpic,
    getSessionsEpic,
    startSessionEpic,
    stopSessionEpic
} from "./features/time-tracker/api/epics.ts";

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
    getSessionsEpic,
    getLastWorkSessionEpic,
]

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        employees: employeesReducer,
        timeTracker: timeTrackerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware),
});

const rootEpic = combineEpics(...epics);
epicMiddleware.run(rootEpic);

export default store;
