import { Flex, Spacer, Text } from "@chakra-ui/react";
import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";

function RolesTableHeader() {
    return (
        <Flex
            align="center"
            fontWeight={450}
            px={5}>
            <Text w="15%" minW={64}>Name</Text>
            <CustomVerticalDivider/>
            <Text>Permissions</Text>
            <Spacer/>
            <Text>Options</Text>
        </Flex>
    );
}

export default RolesTableHeader;