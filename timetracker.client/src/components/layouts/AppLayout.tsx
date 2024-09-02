import { Outlet } from "react-router-dom";
import { Flex, Grid, GridItem } from "@chakra-ui/react";

import Navbar from "./Navbar.tsx";
import TimerProvider from "@features/time-tracker/context/timerContext.tsx";


function AppLayout() {
    return (
        <TimerProvider>
            <Grid templateColumns={{ xl: "250px 1fr", lg: "200px 1fr", base: "125px 1fr" }} overflow="hidden"
                  height="100dvh" bg="gray.100" textColor="gray.800">
                <GridItem>
                    <Navbar/>
                </GridItem>
                <GridItem as={Flex} flexDirection="column" position="relative" p={4}>
                    <Outlet/>
                </GridItem>
            </Grid>
        </TimerProvider>
    );
}

export default AppLayout;
