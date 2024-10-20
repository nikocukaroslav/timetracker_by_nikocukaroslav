import { Flex, ListItem, Spacer, Text } from "@chakra-ui/react";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import PermissionList from "@features/employees/components/PermissionList.tsx";
import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn } from "@components/ui/action-menu";
import { useDispatch } from "react-redux";
import { deleteRole } from "@features/roles/api/actions.ts";
import CreateEditRoleForm from "@features/roles/components/CreateEditRoleForm.tsx";

function Role({ role }) {
    const dispatch = useDispatch();


    function handleDelete() {
        dispatch(deleteRole(role.id))
    }

    return (
        <>
            <ListItem
                display="flex"
                alignItems="center"
                p={4}
                px={5}
                rounded="md"
            >
                <Flex align="center" w="15%" minW={64} justify="space-between">
                    <Text isTruncated>{role.name}</Text>
                </Flex>
                <CustomVerticalDivider/>
                <PermissionList value={role.defaultPermissions}/>
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