import { Button, Flex, Text } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";
import CreateEditRoleForm from "@features/roles/components/CreateEditRoleForm.tsx";

function RolesHeader() {
    return (
        <Flex
            justify="space-between"
            align="center"
            px={5}
            pb={2}
        >
            <Text fontSize="2xl">Manage roles</Text>
            <Flex alignItems="flex-start">
                <CreateEditRoleForm>
                    <Button leftIcon={<PiPlus/>} variant="ghost">Add role</Button>
                </CreateEditRoleForm>
            </Flex>
        </Flex>
    );
}

export default RolesHeader;