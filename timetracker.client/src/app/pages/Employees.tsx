import { AbsoluteCenter, Grid, GridItem, Spinner } from "@chakra-ui/react";

import EmployeeList from "@features/employees/components/EmployeeList.tsx";
import EmployeesFooter from "@features/employees/components/EmployeesFooter.tsx";
import EmployeesHeader from "@features/employees/components/EmployeesHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import { useEffect, useState } from "react";
import { getRoles } from "@features/roles/api/actions.ts";
import { useDispatch } from "react-redux";
import EmployeesTableHeader from "@features/employees/components/EmployeesTableHeader.tsx";
import { EmployeesContext } from "@features/employees/context/employeesContext.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function Employees() {
    const employees = useAppSelector(state => state.employees.users)
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);

    return (
        <EmployeesContext.Provider
            value={{
                loading,
                setLoading
            }}>
            <EmployeesHeader/>
            <Grid
                bg="gray.50"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                templateRows="auto 1fr auto"
                minHeight="calc(100dvh - 9%)"
            >
                <GridItem>
                    <EmployeesTableHeader/>
                    <CustomHorizontalDivider/>
                </GridItem>
                <GridItem overflow="auto">
                    {
                        !loading ?
                            <AbsoluteCenter>
                                <Spinner size="xl"/>
                            </AbsoluteCenter> :
                            employees.length > 0 ?
                                <EmployeeList/> :
                                <AbsoluteCenter>
                                    Employees not found
                                </AbsoluteCenter>
                    }
                </GridItem>
                <GridItem>
                    <CustomHorizontalDivider/>
                    <EmployeesFooter/>
                </GridItem>
            </Grid>

        </EmployeesContext.Provider>
    );
}

export default Employees;