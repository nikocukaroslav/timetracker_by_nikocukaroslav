import {Button, Flex, Text} from "@chakra-ui/react";
import UserFilter from "@features/employees/components/UserFilter.tsx";
import {PiFunnel, PiPlus} from "react-icons/pi";
import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import {useAppSelector} from "@hooks/useAppSelector.ts";

function EmployeesHeader() {
    const pagination = useAppSelector(state => state.employees.pagination)
    const filter = useAppSelector(state => state.employees.filter)
    
    return (
        <Flex
            justify="space-between"
            align="center"
            p="5"
        >
            <Text fontSize="2xl">Company ({pagination.totalCount} members{filter && " founded"})</Text>
            <Flex alignItems="flex-start">
                <UserFilter>
                    <Button leftIcon={<PiFunnel/>} variant="ghost">Filter</Button>
                </UserFilter>
                <CreateEditMemberForm>
                    <Button leftIcon={<PiPlus/>} variant="ghost">Add member</Button>
                </CreateEditMemberForm>
            </Flex>
        </Flex>
    );
}

export default EmployeesHeader;