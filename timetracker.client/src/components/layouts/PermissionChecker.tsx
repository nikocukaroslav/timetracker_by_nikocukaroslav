import {useSelector} from "react-redux";
import {ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
    redirectToSignIn?: boolean;
    permissions: string[];
}

interface RootState {
    authentication: {
        userPermissions: string[];
    };
}

function PermissionChecker({children, permissions, redirectToSignIn = false}: LayoutProps) {
    const userPermissions = useSelector((state: RootState) => state.authentication.userPermissions);

    const hasPermission = permissions.some(permission => userPermissions.includes(permission));

    if (!hasPermission) {
        if (redirectToSignIn) {
            return <Navigate to="/sign-in"/>
        }
        return null;
    }

    return children;
}

export default PermissionChecker;
