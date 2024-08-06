import {Outlet, useLocation} from "react-router-dom";
import Navbar from "./Navbar.tsx";
import {Grid, GridItem} from "@chakra-ui/react";
import GlobalTimer from "../../features/time-tracker/components/GlobalTimer.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getLastWorkSession} from "../../features/time-tracker/api/actions.ts";

function AppLayout() {
    const isTracking = useAppSelector(state => state.timeTracker.isTracking)

    const userId = useAppSelector(state => state.authentication.user.id)

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getLastWorkSession(userId))
    }, [dispatch, userId]);

    return (
        <>
            {isTracking && location.pathname !== "/time-tracker" && <GlobalTimer/>}
            <Grid templateColumns="1fr 6fr" overflow="hidden" height="100dvh" bg="gray.100" textColor="gray.700">
                <GridItem>
                    <Navbar/>
                </GridItem>
                <GridItem m="3">
                    <Outlet/>
                </GridItem>
            </Grid>
        </>
    );
}

export default AppLayout;
