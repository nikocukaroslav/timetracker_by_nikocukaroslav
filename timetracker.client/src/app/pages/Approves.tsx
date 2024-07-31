import {Box, Divider, Flex, Text} from "@chakra-ui/react";

function Approves() {
    return (
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
                    <Text fontSize="2xl">Requests (0)</Text>

                </Flex>
                <Divider borderColor="gray.300" borderWidth="1.5px"/>

            </Flex>
        </Box>
    );
}

export default Approves;
