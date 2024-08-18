import { List } from "@chakra-ui/react";

import Employee from "./Employee.tsx";

import { UserModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function EmployeesList() {
    const employees: UserModel[] = useAppSelector(state => state.employees.users)

    const sortedEmployees: UserModel[] = [...employees].sort((a: UserModel, b: UserModel) => {
        if (a.isEmployed === b.isEmployed) {
            return a.name?.localeCompare(b.name ?? '') || 0;
        } else {
            return a.isEmployed ? -1 : 1;
        }
    });

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
                sortedEmployees.map((employee: UserModel) =>
                    <Employee employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default EmployeesList;