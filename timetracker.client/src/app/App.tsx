import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Approves from "@pages/Approves";
import Calendar from "@pages/Calendar.tsx";
import Employees from "@pages/Employees.tsx";
import NotFound from "@pages/NotFound.tsx";
import Positions from "@pages/Positions.tsx";
import Requests from "@pages/Requests.tsx";
import Settings from "@pages/Settings.tsx";
import SignIn from "@pages/SignIn.tsx";
import Teams from "@pages/Teams.tsx";
import TimeTracker from "@pages/TimeTracker.tsx";
import AppLayout from "@components/layouts/AppLayout.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";
import ProtectedRoute from "@components/layouts/ProtectedRoute.tsx";

import { APPROVE_REQUESTS, MANAGE_TEAMS, MANAGE_USERS } from "@constants";

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>,
        children: [
            {
                path: "time-tracker",
                element:
                    <TimeTracker/>
            },
            {
                path: "calendar",
                element:
                    <Calendar/>
            },
            {
                path: "employees",
                element:
                    <PermissionChecker redirectToNotFound permissions={[MANAGE_USERS]}>
                        <Employees/>
                    </PermissionChecker>,
            },
            {
                path: "teams",
                element:
                    <PermissionChecker redirectToNotFound permissions={[MANAGE_TEAMS]}>
                        <Teams/>
                    </PermissionChecker>
            },
            {
                path: "approves",
                element:
                    <PermissionChecker redirectToNotFound permissions={[APPROVE_REQUESTS]}>
                        <Approves/>
                    </PermissionChecker>
            },
            {
                path: "positions",
                element:
                    <Positions/>
            },
            {
                path: "requests",
                element:
                    <Requests/>
            },
            {
                path: "settings",
                element:
                    <Settings/>
            },
        ],
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
