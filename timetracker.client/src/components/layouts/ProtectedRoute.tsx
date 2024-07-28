import {useSelector} from "react-redux";
import {ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface LayoutProps {
    children: ReactNode
}

interface RootState {
    authentication: {
        loginStatus: boolean;
    };
}

function ProtectedRoute({children}: LayoutProps) {
    const loginStatus = useSelector((state: RootState) => state.authentication.loginStatus)

    return loginStatus ? children : <Navigate to="/sign-in"/>;
}

export default ProtectedRoute;