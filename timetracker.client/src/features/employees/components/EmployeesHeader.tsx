import { Button, Flex, Text } from "@chakra-ui/react";
import UserFilter from "@features/employees/components/UserFilter.tsx";
import { PiFunnel, PiPlus } from "react-icons/pi";
import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

function EmployeesHeader() {
    const pagination = useAppSelector(state => state.employees.pagination)
    const filter = useAppSelector(state => state.employees.filter)

    return (
        <>
            <Flex
                justify="space-between"
                align="center"
                px={5}
                pb={2}
            >
                <Text fontSize="xl">Company ({pagination.totalCount} members{filter && " founded"})</Text>
                <Flex alignItems="flex-start">
                    <UserFilter>
                        <Button leftIcon={<PiFunnel/>} variant="ghost">Filter</Button>
                    </UserFilter>
                    <CreateEditMemberForm>
                        <Button leftIcon={<PiPlus/>} variant="ghost">Add member</Button>
                    </CreateEditMemberForm>
                </Flex>
            </Flex>
            <CustomHorizontalDivider/>
        </>
    );
}

export default EmployeesHeader;