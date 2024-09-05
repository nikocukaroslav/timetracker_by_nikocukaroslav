import { UserModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { List } from "@chakra-ui/react";
import EmployeeStatistic from "@features/accounting/components/EmployeeStatistic.tsx";

function EmployeesStatisticList() {
    const employees: UserModel[] = useAppSelector(state => state.employees.users)

    return (
        <List
            display="flex"
            flexDirection="column"
        >
            {
                employees.map((employee: UserModel) =>
                    <EmployeeStatistic employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default EmployeesStatisticList;