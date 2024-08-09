import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiPlus } from "react-icons/pi";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";

import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import EmployeesList from "@features/employees/components/EmployeesList.tsx";

import { getUsers } from "@features/employees/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function Employees() {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch()
    const employees = useAppSelector(state => state.employees.users)

    function handleActive() {
        setActive(!active);
    }

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
                    w="full"
                    p="5"
                    align="center"
                >
                    <Text fontSize="2xl">Company ({employees.length} members)</Text>
                    <Button onClick={handleActive} variant="ghost">
                        <PiPlus/>
                        <Text ml="1"> Add member</Text>
                    </Button>
                </Flex>
                <Divider borderColor="gray.300" borderWidth="1px"/>
                <EmployeesList/>
            </Flex>
            <CreateEditMemberForm isOpen={active} onClose={handleActive}/>
        </>
    );
}

export default Employees;
