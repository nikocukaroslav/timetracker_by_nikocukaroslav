import {Box, Divider, Flex, Text} from "@chakra-ui/react";

function Approves() {
    return (
        <Box m="3">
            <Flex bg="gray.50" flexDirection="column" rounded="md" boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
            >
                <Flex justify="space-between" w="full" px="5" py="3" align="center">
                    <Text fontSize="2xl">Requests ({0})</Text>
                </Flex>
                <Divider borderColor="gray.300" borderWidth="1.5px"/>
                <Flex py="4" align="center" gap="5" px="5">

                </Flex>
            </Flex>
        </Box>
    );
}

export default Approves;