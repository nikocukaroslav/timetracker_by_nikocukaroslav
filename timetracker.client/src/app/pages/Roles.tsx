import { Grid, GridItem } from "@chakra-ui/react";
import RolesHeader from "@features/roles/components/RolesHeader.tsx";
import RoleList from "@features/roles/components/RoleList.tsx";
import RolesTableHeader from "@features/roles/components/RolesTableHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

function Roles() {
    return (
        <>
            <RolesHeader/>
            <Grid
                bg="gray.50"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                templateRows="auto 1fr"
                height="calc(100dvh - 9%)"
            >
                <GridItem>
                    <RolesTableHeader/>
                    <CustomHorizontalDivider/>
                </GridItem>
                <GridItem overflow="auto">
                    <RoleList/>
                </GridItem>

            </Grid>
        </>
    );

}

export default Roles;