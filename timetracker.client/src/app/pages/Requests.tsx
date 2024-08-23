import { useState } from "react";
import { PiPencilSimple } from "react-icons/pi";
import { Button, Flex, Text } from "@chakra-ui/react";

import NewRequestForm from "@features/requests/components/NewRequestForm.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

function Requests() {
    const [active, setActive] = useState(false);

    function handleActive() {
        setActive(!active);
    }

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
                    <Text fontSize="2xl">Your requests</Text>
                    <Button onClick={handleActive} variant="ghost">
                        <PiPencilSimple size="18"/>
                        <Text ml="1">New request</Text>
                    </Button>
                </Flex>
                <CustomHorizontalDivider/>
                <Flex py="4" align="center" gap="5" px="5"></Flex>
            </Flex>
            <NewRequestForm isOpen={active} onClose={handleActive}/>
        </>
    );
}

export default Requests;
