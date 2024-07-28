import {Box, Button, Divider, Flex, List, Text} from "@chakra-ui/react";
import {PiPlus} from "react-icons/pi";
import {useEffect, useState} from "react";
import CreateMemberForm from "../../features/employees/CreateMemberForm.tsx";
import {getUsers} from "../../features/employees/employeesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import Employee from "../../features/employees/Employee.tsx";


function Employees() {
    const [active, setActive] = useState(false);

    const employees = useSelector(state => state.employees.users)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    function handleActive() {
        setActive(!active);
    }


    return (
        <>
            <Box m="3">
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
                    <Divider borderColor="gray.300" borderWidth="1.5px"/>
                    <List display="flex" flexDirection="column">
                        {
                            employees.map((employee) =>
                                <Employee employee={employee} key={employee.id}/>
                            )
                        }
                    </List>
                </Flex>
            </Box>
            <CreateMemberForm isOpen={active} onClose={handleActive}/>
        </>
    );
}

export default Employees;
