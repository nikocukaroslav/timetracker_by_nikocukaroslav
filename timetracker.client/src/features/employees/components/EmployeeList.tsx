import { List } from "@chakra-ui/react";

import Employee from "./Employee.tsx";

import { UserModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function EmployeeList() {
    const employees: UserModel[] = useAppSelector(state => state.employees.users)

    return (
        <List
            display="flex"
            flexDirection="column"
            overflow="auto"
        >
            {
                employees.map((employee: UserModel) =>
                    <Employee employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default EmployeeList;