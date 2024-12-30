import { Flex, Spacer, Text } from "@chakra-ui/react";
import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";

function EmployeesTableHeader() {
    return (
        <Flex
            align="center"
            fontWeight={450}
            px={5}>
            <Text w={80}>Title</Text>
            <CustomVerticalDivider/>
            <Text w={24}>Role</Text>
            <CustomVerticalDivider/>
            <Text w={24}>Timeload</Text>
            <CustomVerticalDivider/>
            <Text>Permissions</Text>
            <Spacer/>
            <Text>Options</Text>
        </Flex>
    );
}

export default EmployeesTableHeader;