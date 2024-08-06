import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {LayoutProps} from "../../interfaces/components.ts";
import {Navigate} from "react-router-dom";

function PermissionChecker({children, permissions, redirectToNotFound = false}: LayoutProps) {
    const userPermissions = useAppSelector((state) => state.authentication.user.permissions);
    const hasPermission = permissions.some(permission => userPermissions.includes(permission));

    if (!hasPermission) {
        if (redirectToNotFound) {
            return <Navigate to="/not-found"/>;
        }
        return null;
    }

    return children;
}

export default PermissionChecker;
