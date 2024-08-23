import { Flex, Text } from "@chakra-ui/react";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

function Approves() {
    return (
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
            <CustomHorizontalDivider/>
        </Flex>
    );
}

export default Approves;
