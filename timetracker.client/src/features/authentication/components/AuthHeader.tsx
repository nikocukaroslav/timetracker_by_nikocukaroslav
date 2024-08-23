import { Box, Flex, Img, Text } from "@chakra-ui/react";

function AuthHeader() {
    return (
        <Box>
            <Flex align="center" gap="3" justify="center" mb="2">
                <Img src="/favicon-by-cake.ico" w="44px" h="44px"/>
                <Text fontSize="xl" letterSpacing="0.5px">Time Tracker</Text>
            </Flex>
            <Text align="center" fontSize="sm" color="gray.500" letterSpacing="1px">Time manager for your
                company
            </Text>
        </Box>
    );
}

export default AuthHeader;