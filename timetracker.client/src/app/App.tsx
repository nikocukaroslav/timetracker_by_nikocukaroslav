import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Teams from "./pages/Teams.tsx";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";
import Employees from "./pages/Employees.tsx";
import Requests from "./pages/Requests.tsx";
import TimeTracker from "./pages/TimeTracker.tsx";
import Calendar from "./pages/Calendar.tsx";
import SignIn from "./pages/SignIn.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import Approves from "./pages/Approves.tsx";
import AppLayout from "../components/layouts/AppLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>,
        children: [
            {
                path: "/employees",
                element:
                    <ProtectedRoute>
                        <Employees/>
                    </ProtectedRoute>
            },
            {
                path: "/time-tracker",
                element:
                    <ProtectedRoute>
                        <TimeTracker/>
                    </ProtectedRoute>
            },
            {
                path: "/teams",
                element:
                    <ProtectedRoute>
                        <Teams/>
                    </ProtectedRoute>,
            },
            {
                path: "/calendar",
                element:
                    <ProtectedRoute>
                        <Calendar/>
                    </ProtectedRoute>,
            },
            {
                path: "/approves",
                element:
                    <ProtectedRoute>
                        <Approves/>
                    </ProtectedRoute>,
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
