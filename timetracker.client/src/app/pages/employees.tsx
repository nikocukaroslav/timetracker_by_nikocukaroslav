import {Box, Button, Divider, Flex, Img, Text} from "@chakra-ui/react";
import {PiPlus} from "react-icons/pi";
import {useState} from "react";
import CreateMemberForm from "../../features/employees/create-member-form.tsx";

function Employees() {
    const [active, setActive] = useState(false);

    function handleActive() {
        setActive(!active);
    }

    return (
        <>
            <Box m="3">
                <Flex bg="gray.50" flexDirection="column" rounded="md" boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                >
                    <Flex justify="space-between" w="full" px="5" py="3" align="center">
                        <Text fontSize="2xl">Company</Text>
                        <Button onClick={handleActive} variant="ghost"><PiPlus/><Text ml="1"> Add member</Text>
                        </Button>
                    </Flex>
                    <Divider borderColor="gray.300" borderWidth="1.5px"/>
                    <Flex py="4" align="center" gap="5" px="5">
                        <Img alt="user-img" w="28px" h="28px"
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"/>
                        <Flex direction="column">
                            <Text>Yaroslav Nikonchyk</Text>
                            <Text fontSize="sm" color="gray.500">nikoc@gmail.com</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <CreateMemberForm isOpen={active} onClose={handleActive}/>
        </>
    );
}

export default Employees;