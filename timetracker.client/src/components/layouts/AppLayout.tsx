import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Navbar from "./Navbar.tsx";
import {Grid, GridItem} from "@chakra-ui/react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {refreshToken} from "../../features/authentication/authenticationSlice.ts";

function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const expiresAt = useAppSelector(state => state.authentication.expiresAt);
    
    useEffect(() => {
        const now = new Date().getTime();
        const timeUntilExpiration: number = expiresAt - now;

        const timeoutId = setTimeout(() => {
            dispatch(refreshToken());
        }, timeUntilExpiration);

        return () => clearTimeout(timeoutId);
    }, [dispatch, expiresAt]);

    useEffect(() => {
        localStorage.setItem('lastRoute', location.pathname);
    }, [location]);

    useEffect(() => {
        navigate(`${localStorage.getItem("lastRoute")}`);
    }, [navigate]);


    return (
        <>
            <Grid templateColumns="1fr 6fr" height="100dvh" bg="gray.100" textColor="gray.700">
                <GridItem>
                    <Navbar/>
                </GridItem>
                <GridItem overflow="hidden">
                    <Outlet/>
                </GridItem>
            </Grid>
        </>
    );
}

export default AppLayout;
