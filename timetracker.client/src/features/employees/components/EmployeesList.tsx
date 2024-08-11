import { List } from "@chakra-ui/react";

import Employee from "./Employee.tsx";

import { UserModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function EmployeesList() {
    const employees: UserModel[] = useAppSelector(state => state.employees.users)

    const sortedEmployees: UserModel[] = [...employees].sort((a: UserModel, b: UserModel) => {
        return a.name?.localeCompare(b.name as string) || 0;
    });

    return (
        <List display="flex" flexDirection="column"
        >
            {
                sortedEmployees.map((employee: UserModel) =>
                    <Employee employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default EmployeesList;