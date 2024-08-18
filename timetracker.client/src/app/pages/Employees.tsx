import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PiCaretLeftBold, PiCaretRightBold, PiPlus } from "react-icons/pi";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";

import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import EmployeesList from "@features/employees/components/EmployeesList.tsx";

import { getUsers } from "@features/employees/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function Employees() {
    const dispatch = useDispatch()
    const pagination = useAppSelector(state => state.employees.pagination)

    useEffect(() => {
        dispatch(getUsers(1));
    }, [dispatch]);

    function prevPage() {
        pagination.page && dispatch(getUsers(pagination.page - 1));
    }
    function nextPage() {
        pagination.page && dispatch(getUsers(pagination.page + 1));
    }
    return (
        <>
            <Flex
                bg="gray.50"
                flexDirection="column"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                overflow="hidden"
                maxHeight="95dvh"
            >
                <Flex
                    justify="space-between"
                    align="center"
                    p="5"
                >
                    <Text fontSize="2xl">Company ({pagination.totalCount} members)</Text>
                    <CreateEditMemberForm>
                        <Button leftIcon={<PiPlus/>} variant="ghost">Add member</Button>
                    </CreateEditMemberForm>
                </Flex>
                <Divider borderColor="gray.300" borderWidth="1px"/>
                <EmployeesList/>
                <Divider borderColor="gray.300" borderWidth="1px"/>
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    p="3"
                >
                    <Button onClick={prevPage} isDisabled={!pagination.hasPreviousPage} variant="ghost"><PiCaretLeftBold size="24"/></Button>
                    <Text w={20} fontSize="2xl" textAlign="center" >{pagination.page}/{pagination.totalPages}</Text>
                    <Button onClick={nextPage} isDisabled={!pagination.hasNextPage} variant="ghost"><PiCaretRightBold size="24"/></Button>
                </Flex>
            </Flex>
        </>
    );
}

export default Employees;
