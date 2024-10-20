import { Grid, GridItem, } from "@chakra-ui/react";

import EmployeeList from "@features/employees/components/EmployeeList.tsx";
import EmployeesFooter from "@features/employees/components/EmployeesFooter.tsx";
import EmployeesHeader from "@features/employees/components/EmployeesHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import { useEffect } from "react";
import { getRoles } from "@features/roles/api/actions.ts";
import { useDispatch } from "react-redux";
import EmployeesTableHeader from "@features/employees/components/EmployeesTableHeader.tsx";

function Employees() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);

    return (
        <>
            <EmployeesHeader/>
            <Grid
                bg="gray.50"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                templateRows="auto 1fr auto"
                height="calc(100dvh - 9%)"
                minHeight="calc(100dvh - 9%)"
            >
                <GridItem>
                    <EmployeesTableHeader/>
                    <CustomHorizontalDivider/>
                </GridItem>
                <GridItem overflow="auto">
                    <EmployeeList/>
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