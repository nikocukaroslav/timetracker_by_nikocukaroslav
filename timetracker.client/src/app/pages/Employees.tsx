import {Box, Button, Divider, Flex, List, Text} from "@chakra-ui/react";
import {PiPlus} from "react-icons/pi";
import {useState} from "react";
import CreateMemberForm from "../../features/employees/components/CreateMemberForm.tsx";
import Employee from "../../features/employees/components/Employee.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {User} from "../../interfaces/actions.ts";


function Employees() {
    const [active, setActive] = useState(false);

    const employees = useAppSelector(state => state.employees.users)

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
                    <List display="flex" flexDirection="column"
                          overflowY="auto"
                          max-h="90dvh" h="90dvh"
                          flexGrow={1} overflowX="hidden"
                    >
                        {
                            employees.map((employee: User) =>
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
