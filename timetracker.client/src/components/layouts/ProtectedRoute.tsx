import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "@components/ui/Spinner.tsx";

import { authorize, refreshToken } from "@features/authentication/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { LayoutProps } from "@interfaces/components.ts";
import { getCookie } from "@utils/cookieHandlers.ts";

function ProtectedRoute({children}: LayoutProps) {
    const dispatch = useDispatch();
    const loginStatus = useAppSelector(state => state.authentication.user);
    const expiresAt = useAppSelector(state => state.authentication.expiresAt);

    const refreshTokenCookie = getCookie("refreshToken");

    const [isLoading, setIsLoading] = useState(true);

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
        if (refreshTokenCookie && !loginStatus && isLoading) {
            dispatch(authorize());
        } else {
            setIsLoading(false);
        }
    }, [loginStatus]);

    if (isLoading)
        return <Spinner/>;

    if (!loginStatus)
        return <Navigate to="/sign-in"/>;

    return children;
}

export default ProtectedRoute;
