import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, GridItem } from "@chakra-ui/react";

import GlobalTimer from "@features/time-tracker/components/GlobalTimer.tsx";
import Navbar from "./Navbar.tsx";

import { getLastWorkSession } from "@features/time-tracker/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

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
            <Grid templateColumns="250px 1fr" overflow="hidden" height="100dvh" bg="gray.100" textColor="gray.700">
                <GridItem>
                    <Navbar/>
                </GridItem>
                <GridItem position="relative" overflow="auto" p={4}>
                    <Outlet/>
                </GridItem>
            </Grid>
        </>
    );
}

export default AppLayout;
