import {Box, Button, Divider, Flex, Text} from "@chakra-ui/react";
import {PiPencilSimple} from "react-icons/pi";
import {useState} from "react";
import NewRequestForm from "../../features/requests/new-request-form.tsx";

function Requests() {
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
                        <Text fontSize="2xl">Your requests</Text>
                        <Button onClick={handleActive} variant="ghost"><PiPencilSimple size="18"/><Text ml="1"> New
                            request</Text>
                        </Button>
                    </Flex>
                    <Divider borderColor="gray.300" borderWidth="1.5px"/>
                    <Flex py="4" align="center" gap="5" px="5">

                    </Flex>
                </Flex>
            </Box>
            <NewRequestForm isOpen={active} onClose={handleActive}/>
        </>
    );
}

export default Requests;