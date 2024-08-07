import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CustomSpinner from "@components/ui/CustomSpinner.tsx";

import { authorize, refreshToken } from "@features/authentication/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { LayoutProps } from "@interfaces/components.ts";

function ProtectedRoute({children}: LayoutProps) {
    const dispatch = useDispatch();
    const loginStatus = useAppSelector(state => state.authentication.user);
    const expiresAt = useAppSelector(state => state.authentication.expiresAt);

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
    }, [dispatch, expiresAt]);

    useEffect(() => {
        if (!loginStatus && isLoading) {
            dispatch(authorize());
        } else {
            setIsLoading(false);
        }
    }, [loginStatus, dispatch, isLoading]);

    if (isLoading)
        return <CustomSpinner/>;

    return loginStatus ? children : <Navigate to="/sign-in"/>;
}

export default ProtectedRoute;
