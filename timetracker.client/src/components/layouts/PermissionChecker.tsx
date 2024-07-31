import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {LayoutProps} from "../../interfaces/components.ts";

function PermissionChecker({children, permissions, redirectToSignIn = false}: LayoutProps) {
    const userPermissions = useAppSelector((state) => state.authentication.userPermissions);

    const hasPermission = permissions.some(permission => userPermissions.includes(permission));

    if (!hasPermission) {
        if (redirectToSignIn) {
            return <Navigate to="/sign-in"/>
        }
        return <Navigate to="dfsdfsdffd"/>;
    }

    return children;
}

export default PermissionChecker;
