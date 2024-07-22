import {Outlet} from "react-router-dom";
import Navbar from "../../features/menu/components/navbar.tsx";
import {Grid, GridItem} from "@chakra-ui/react";

function AppLayout() {


    return (
        <Grid templateColumns="1fr 6fr" height="100dvh" bg="gray.100">
            <GridItem>
                <Navbar/>
            </GridItem>
            <GridItem>
                <Outlet/>
            </GridItem>
        </Grid>
    );
}

export default AppLayout;