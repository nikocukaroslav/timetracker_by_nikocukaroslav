import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Approves from "@pages/Approves";
import Calendar from "@pages/Calendar.tsx";
import Employees from "@pages/Employees.tsx";
import NotFound from "@pages/NotFound.tsx";
import Roles from "@pages/Roles";
import Requests from "@pages/Requests.tsx";
import Settings from "@pages/Settings.tsx";
import SignIn from "@pages/SignIn.tsx";
import TimeTracker from "@pages/TimeTracker.tsx";
import AppLayout from "@components/layouts/AppLayout.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";
import ProtectedRoute from "@components/layouts/ProtectedRoute.tsx";
import SetPassword from "@pages/SetPassword.tsx";

import { APPROVE_REQUESTS, MANAGE_ROLES, MANAGE_USERS } from "@constants";
import Accounting from "@pages/Accounting.tsx";

const router = createBrowserRouter([
    {
        element:
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>,
        children: [
            {
                path: "/",
                element: <Navigate to="time-tracker" replace/>
            },
            {
                path: "time-tracker",
                element: <TimeTracker/>
            },
            {
                path: "calendar",
                element: <Calendar/>
            },
            {
                path: "employees",
                element:
                    <PermissionChecker redirectToNotFound permissions={[MANAGE_USERS]}>
                        <Employees/>
                    </PermissionChecker>,
            },
            {
                path: "approves",
                element:
                    <PermissionChecker redirectToNotFound permissions={[APPROVE_REQUESTS]}>
                        <Approves/>
                    </PermissionChecker>
            },
            {
                path: "roles",
                element:
                    <PermissionChecker redirectToNotFound permissions={[MANAGE_ROLES]}>
                        <Roles/>
                    </PermissionChecker>
            },
            {
                path: "accounting",
                element: <Accounting/>
            },
            {
                path: "requests",
                element: <Requests/>
            },
            {
                path: "settings",
                element: <Settings/>
            },
        ],
    },
    {
        path: "auth/create-password/:temporaryLinkId",
        element: <SetPassword/>
    },
    {
        path: "/sign-in",
        element: <SignIn/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
