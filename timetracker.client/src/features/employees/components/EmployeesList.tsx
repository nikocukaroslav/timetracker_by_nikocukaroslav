import {List} from "@chakra-ui/react";
import {UserModel} from "../../../interfaces/domain.ts";
import Employee from "./Employee.tsx";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";

function EmployeesList() {
    const employees = useAppSelector(state => state.employees.users)

    return (
        <List display="flex" flexDirection="column"
        >
            {
                employees.map((employee: UserModel) =>
                    <Employee employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default EmployeesList;