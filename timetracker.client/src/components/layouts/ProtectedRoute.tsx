import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "@components/ui/Spinner.tsx";

import { authorize, refreshToken } from "@features/authentication/api/actions.ts";
import { setAuthenticating } from "@features/authentication/authenticationSlice.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { LayoutProps } from "@interfaces/components.ts";
import { getCookie } from "@utils/cookieHandlers.ts";

function ProtectedRoute({children}: LayoutProps) {
    const dispatch = useDispatch();

    const user = useAppSelector(state => state.authentication.user);
    const authenticating = useAppSelector(state => state.authentication.authenticating);
    const expiresAt = useAppSelector(state => state.authentication.expiresAt);

    const refreshTokenCookie = getCookie("refreshToken");

    useEffect(() => {
        if (expiresAt) {
            const now = new Date().getTime();
            const timeUntilExpiration: number = expiresAt - now;

            const timeoutId = setTimeout(() => {
                dispatch(refreshToken());
            }, timeUntilExpiration);

            return () => clearTimeout(timeoutId);
        }
    }, [expiresAt]);

    useEffect(() => {
        if (refreshTokenCookie && !user) {
            dispatch(authorize());
        } else {
            dispatch(setAuthenticating(false));
        }
    }, [user]);

    if (authenticating)
        return <Spinner/>;

    if (!user)
        return <Navigate to="/sign-in"/>;

    return children;
}

export default ProtectedRoute;
