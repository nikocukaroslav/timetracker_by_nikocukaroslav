import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Teams from "./pages/Teams.tsx";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";
import Employees from "./pages/Employees.tsx";
import Requests from "./pages/Requests.tsx";
import TimeTracker from "./pages/TimeTracker.tsx";
import Calendar from "./pages/Calendar.tsx";
import SignIn from "./pages/SignIn.tsx";
import Approves from "./pages/Approves.tsx";
import AppLayout from "../components/layouts/AppLayout.tsx";
import PermissionChecker from "../components/layouts/PermissionChecker.tsx";
import {APPROVE_REQUESTS, MANAGE_TEAMS, MANAGE_USERS} from "../constants.ts";
import ProtectedRoute from "../components/layouts/ProtectedRoute.tsx";
import Positions from "./pages/Positions.tsx";

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
