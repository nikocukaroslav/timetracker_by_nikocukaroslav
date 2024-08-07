import { useState } from "react";
import { PiPlus } from "react-icons/pi";
import { Button, Divider, Flex, Img, Text } from "@chakra-ui/react";

import AddMemberForm from "@features/teams/components/AddMemberForm.tsx";

function Teams() {
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
                    <Text fontSize="2xl">Team</Text>
                    <Button variant="ghost" onClick={handleActive}>
                        <PiPlus/>
                        <Text ml="1">Add member</Text>
                    </Button>
                </Flex>
                <Divider borderColor="gray.300" borderWidth="1.5px"/>
                <Flex py="4" align="center" gap="5" px="5">
                    <Img
                        alt="user-img"
                        w="28px"
                        h="28px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    />
                    <Flex direction="column">
                        <Text>Yaroslav Nikonchyk</Text>
                        <Text fontSize="sm" color="gray.500">
                            nikoc@gmail.com
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <AddMemberForm isOpen={active} onClose={handleActive}/>
        </>
    );
}

export default Teams;
