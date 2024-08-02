import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.tsx";
import {Grid, GridItem} from "@chakra-ui/react";

function AppLayout() {
    return (
        <Grid templateColumns="1fr 6fr" height="100dvh" bg="gray.100" textColor="gray.700">
            <GridItem>
                <Navbar/>
            </GridItem>
            <GridItem overflow="hidden">
                <Outlet/>
            </GridItem>
        </Grid>
    );
}

export default AppLayout;
