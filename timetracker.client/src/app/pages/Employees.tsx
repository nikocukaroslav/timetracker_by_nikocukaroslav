import { Grid, GridItem, } from "@chakra-ui/react";

import EmployeesList from "@features/employees/components/EmployeesList.tsx";
import EmployeesFooter from "@features/employees/components/EmployeesFooter.tsx";
import EmployeesHeader from "@features/employees/components/EmployeesHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

function Employees() {
    return (
        <>
            <Grid
                bg="gray.50"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                templateRows="auto 1fr auto"
                height="97dvh"
            >
                <GridItem>
                    <EmployeesHeader/>
                    <CustomHorizontalDivider/>
                </GridItem>
                <GridItem overflow="auto">
                    <EmployeesList/>
                </GridItem>
                <GridItem>
                    <CustomHorizontalDivider/>
                    <EmployeesFooter/>
                </GridItem>
            </Grid>
        </>
    );
}

export default Employees;
