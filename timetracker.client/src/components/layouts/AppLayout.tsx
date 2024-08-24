import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, GridItem } from "@chakra-ui/react";

import Navbar from "./Navbar.tsx";

import { getLastWorkSession } from "@features/time-tracker/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function AppLayout() {
    const userId = useAppSelector(state => state.authentication.user?.id)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLastWorkSession(userId))
    }, [dispatch, userId]);

    return (
        <>
            <Grid templateColumns={{ xl: "250px 1fr", lg: "200px 1fr", base: "125px 1fr" }} overflow="hidden"
                  height="100dvh" bg="gray.100" textColor="gray.800">
                <GridItem>
                    <Navbar/>
                </GridItem>
                <GridItem position="relative" p={4}>
                    <Outlet/>
                </GridItem>
            </Grid>
        </>
    );
}

export default AppLayout;
