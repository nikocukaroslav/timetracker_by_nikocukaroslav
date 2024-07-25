import {configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import authenticationReducer from "./features/authentication/authenticationSlice.ts";
import {loginEpic} from "./features/authentication/api/epics.ts";
import {createUserEpic} from "./features/employees/api/epics.ts";
import employeesReducer from "./features/employees/employeesSlice.ts";

const epics = [
    loginEpic,
    createUserEpic
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
epicMiddleware.run(rootEpic);

export default store;
