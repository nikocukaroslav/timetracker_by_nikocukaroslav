import { List } from "@chakra-ui/react";

import Employee from "./Employee.tsx";

import { UserModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function EmployeesList() {
    const employees: UserModel[] = useAppSelector(state => state.employees.users)

    return (
        <List
            display="flex"
            flexDirection="column"
            sx={{
                '::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
            overflowY="auto"
            overflowX={{ md: "hidden", base: "auto" }}>
            {
                employees.map((employee: UserModel) =>
                    <Employee employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default EmployeesList;