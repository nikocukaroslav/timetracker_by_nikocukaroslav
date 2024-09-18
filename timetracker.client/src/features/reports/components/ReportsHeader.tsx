import ReportsControls from "@features/reports/components/ReportsControls.tsx";
import { Flex, Spacer } from "@chakra-ui/react";
import EmployeesSearch from "@features/employees/components/EmployeesSearch.tsx";

function ReportsHeader() {
    return (
        <Flex>
            <ReportsControls/>
            <Spacer/>
            <EmployeesSearch/>
        </Flex>
    );
}

export default ReportsHeader;