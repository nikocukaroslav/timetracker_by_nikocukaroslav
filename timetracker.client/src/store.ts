import {configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import authenticationReducer from "./features/authentication/authenticationSlice.ts";
import {authorizeEpic, loginEpic, logoutEpic, refreshTokenEpic} from "./features/authentication/api/epics.ts";
import {
    createUserEpic,
    deleteUserEpic,
    getUserEpic,
    getUsersEpic,
    updateUserPermissionsEpic
} from "./features/employees/api/epics.ts";
import employeesReducer from "./features/employees/employeesSlice.ts";

const epics = [
    loginEpic,
    authorizeEpic,
    logoutEpic,
    refreshTokenEpic,
    createUserEpic,
    getUsersEpic,
    getUserEpic,
    deleteUserEpic,
    updateUserPermissionsEpic
]

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        employees: employeesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware),
});

const rootEpic = combineEpics(...epics);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
epicMiddleware.run(rootEpic);

export default store;
