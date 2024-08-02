import {LayoutProps} from "../../interfaces/components.ts";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {authorize, refreshToken} from "../../features/authentication/authenticationSlice.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import CustomSpinner from "../ui/CustomSpinner.tsx";

function ProtectedRoute({children}: LayoutProps) {
    const dispatch = useDispatch();
    const loginStatus = useAppSelector(state => state.authentication.loginStatus);
    const expiresAt = useAppSelector(state => state.authentication.expiresAt);
    const isTokenExist = localStorage.getItem("token");

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
        if (!isTokenExist) {
            setIsLoading(false)
        }
    }, [isTokenExist]);

    useEffect(() => {
        if (!loginStatus && isTokenExist) {
            dispatch(authorize());
        } else {
            setIsLoading(false);
        }
    }, [loginStatus, dispatch, isTokenExist]);

    if (isLoading)
        return <CustomSpinner/>;

    return loginStatus ? children : <Navigate to="/sign-in"/>;
}

export default ProtectedRoute;
