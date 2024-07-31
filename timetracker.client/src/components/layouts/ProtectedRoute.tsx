import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector.ts";

interface LayoutProps {
    children: ReactNode
}

function ProtectedRoute({children}: LayoutProps) {
    const loginStatus = useAppSelector(state => state.authentication.loginStatus)

    return loginStatus ? children : <Navigate to="/sign-in"/>;
}

export default ProtectedRoute;