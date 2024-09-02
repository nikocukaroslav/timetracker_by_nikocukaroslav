import { Flex, Icon, ListItem, Spacer, Text } from "@chakra-ui/react";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import { GrMoney, GrUserManager, GrUserSettings } from "react-icons/gr";
import { PiTerminalWindowBold } from "react-icons/pi";
import PermissionsList from "@features/employees/components/PermissionsList.tsx";
import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn } from "@components/ui/action-menu";
import { useDispatch } from "react-redux";
import { deleteRole } from "@features/roles/api/actions.ts";
import CreateEditRoleForm from "@features/roles/components/CreateEditRoleForm.tsx";

function Role({ role }) {
    const dispatch = useDispatch();

    function handleAvatar() {
        if (role.name === "Developer")
            return PiTerminalWindowBold
        if (role.name === "Manager")
            return GrUserManager
        if (role.name === "Accountant")
            return GrMoney
        if (role.name === "Account manager")
            return GrUserSettings
    }


    function handleDelete() {
        dispatch(deleteRole(role.id))
    }

    return (
        <>
            <ListItem
                display="flex"
                alignItems="center"
                p="5"
                rounded="md"
            >
                <Flex align="center" w={64} justify="space-between">
                    <Flex gap="4" align="center">
                        <Icon boxSize={6} as={handleAvatar()}/>
                        <Text>{role.name}</Text>
                    </Flex>
                </Flex>
                <CustomVerticalDivider/>
                <PermissionsList value={role.defaultPermissions}/>
                <Spacer/>
                <ActionMenu>
                    <CreateEditRoleForm
                        isEditing
                        formData={role}>
                        <ActionMenuEditBtn/>
                    </CreateEditRoleForm>
                    <ActionMenuDeleteBtn confirmText="Delete this role from role list" onClick={handleDelete}/>
                </ActionMenu>
            </ListItem>
            <CustomHorizontalDivider/>
        </>
    );
}

export default Role;