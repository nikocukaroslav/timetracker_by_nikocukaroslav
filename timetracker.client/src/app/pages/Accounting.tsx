import EmployeesStatisticList from "@features/accounting/components/EmployeesStatisticList.tsx";
import { Stack } from "@chakra-ui/react";

function Accounting() {
    return (
        <Stack
            bg="gray.50"
            rounded="md"
            boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
            height="calc(100dvh - 3%)"
        >
            <EmployeesStatisticList/>
        </Stack>
    );
}

export default Accounting;