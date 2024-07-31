import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Teams from "./pages/Teams.tsx";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";
import Employees from "./pages/Employees.tsx";
import Requests from "./pages/Requests.tsx";
import TimeTracker from "./pages/TimeTracker.tsx";
import Calendar from "./pages/Calendar.tsx";
import SignIn from "./pages/SignIn.tsx";
import ProtectedRoute from "../components/layouts/ProtectedRoute.tsx";
import Approves from "./pages/Approves.tsx";
import AppLayout from "../components/layouts/AppLayout.tsx";
import PermissionChecker from "../components/layouts/PermissionChecker.tsx";
import {APPROVE_REQUESTS, MANAGE_TEAMS, MANAGE_USERS, WORKING_PART_TIME} from "../constants.ts";
import {employeesLoader, userLoader} from "../utils/loaders.ts";

const router = createBrowserRouter([
    {
        path: "/",
        loader: userLoader,
        element:
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>,
        children: [
            {
                path: "/time-tracker",
                element:
                    <ProtectedRoute>
                        <PermissionChecker redirectToSignIn permissions={[WORKING_PART_TIME]}>
                            <TimeTracker/>
                        </PermissionChecker>
                    </ProtectedRoute>
            },
            {
                path: "/calendar",
                element:
                    <ProtectedRoute>
                        <Calendar/>
                    </ProtectedRoute>,
            },
            {
                path: "/employees",
                element:
                    <ProtectedRoute>
                        <PermissionChecker redirectToSignIn permissions={[MANAGE_USERS]}>
                            <Employees/>
                        </PermissionChecker>
                    </ProtectedRoute>,
                loader: employeesLoader,
            },
            {
                path: "/teams",
                element:
                    <ProtectedRoute>
                        <PermissionChecker redirectToSignIn permissions={[MANAGE_TEAMS]}>
                            <Teams/>
                        </PermissionChecker>
                    </ProtectedRoute>,
            },
            {
                path: "/approves",
                element:
                    <ProtectedRoute>
                        <PermissionChecker redirectToSignIn permissions={[APPROVE_REQUESTS]}>
                            <Approves/>
                        </PermissionChecker>
                    </ProtectedRoute>
            },
            {
                path: "/requests",
                element:
                    <ProtectedRoute>
                        <Requests/>
                    </ProtectedRoute>,
            },
            {
                path: "/settings",
                element:
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>,
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
