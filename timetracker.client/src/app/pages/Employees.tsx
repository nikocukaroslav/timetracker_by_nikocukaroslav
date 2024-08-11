import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PiPlus } from "react-icons/pi";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";

import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import EmployeesList from "@features/employees/components/EmployeesList.tsx";

import { getUsers } from "@features/employees/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function Employees() {
    const dispatch = useDispatch()
    const employees = useAppSelector(state => state.employees.users)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <>
            <Flex
                bg="gray.50"
                flexDirection="column"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
            >
                <Flex
                    justify="space-between"
                    align="center"
                    w="full"
                    p="5"
                >
                    <Text fontSize="2xl">Company ({employees.length} members)</Text>
                    <CreateEditMemberForm>
                        <Button leftIcon={<PiPlus/>} variant="ghost">Add member</Button>
                    </CreateEditMemberForm>
                </Flex>
                <Divider borderColor="gray.300" borderWidth="1px"/>
                <EmployeesList/>
            </Flex>
        </>
    );
}

export default Employees;
