import { UserModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { List } from "@chakra-ui/react";
import Report from "@features/reports/components/Report.tsx";

function ReportList() {
    const reports: UserModel[] = useAppSelector(state => state.reports.reports)

    return (
        <List
            display="flex"
            flexDirection="column"
        >
            {
                reports.map((employee: UserModel) =>
                    <Report employee={employee} key={employee.id}/>
                )
            }
        </List>
    );
}

export default ReportList;