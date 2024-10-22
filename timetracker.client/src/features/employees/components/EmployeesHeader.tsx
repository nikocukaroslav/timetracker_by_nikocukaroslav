import { Button, Flex, Text } from "@chakra-ui/react";
import EmployeesFilter from "@features/employees/components/EmployeesFilter.tsx";
import { PiFunnel, PiPlus } from "react-icons/pi";
import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import EmployeesSearch from "@features/employees/components/EmployeesSearch.tsx";

function EmployeesHeader() {
    const pagination = useAppSelector(state => state.employees.pagination)

    return (
        <Flex
            justify="space-between"
            align="center"
            mx={4}
            mb={2}
        >
            <Text w={72} fontSize="xl">Company ({pagination.totalCount} members)</Text>
            <EmployeesSearch/>
            <Flex w={72} justifyContent="flex-end">
                <EmployeesFilter>
                    <Button leftIcon={<PiFunnel/>}>Filter</Button>
                </EmployeesFilter>
                <CreateEditMemberForm>
                    <Button leftIcon={<PiPlus/>}>Add member</Button>
                </CreateEditMemberForm>
            </Flex>
        </Flex>
    );
}

export default EmployeesHeader;