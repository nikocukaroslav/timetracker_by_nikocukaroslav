import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "./components/layouts/app-layout.tsx";
import Calendar from "./app/pages/calendar.tsx";
import Teams from "./app/pages/teams.tsx";
import Approves from "./app/pages/approves.tsx";
import Settings from "./app/pages/settings.tsx";
import NotFound from "./app/pages/not-found.tsx";
import Employees from "./app/pages/employees.tsx";
import Requests from "./app/pages/requests.tsx";
import TimeTracker from "./app/pages/time-tracker.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/employees",
                element: (
                    <Employees/>
                ),
            },
            {
                path: "/time-tracker",
                element: (
                    <TimeTracker/>
                ),
            },
            {
                path: "/teams",
                element: (
                    <Teams/>
                ),
            },
            {
                path: "/calendar",
                element: (
                    <Calendar/>
                ),
            },
            {
                path: "/approves",
                element: (
                    <Approves/>
                ),
            },
            {
                path: "/requests",
                element: (
                    <Requests/>
                ),
            },
            {
                path: "/settings",
                element: (
                    <Settings/>
                ),
            },
        ],
    },
    {
        path: "*",
        element: (
            <NotFound/>
        ),
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;