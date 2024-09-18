import { Button, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { PiCaretDown } from "react-icons/pi";
import { permissionList } from "@constants";

function PermissionList({ value }) {
    return (
        <Menu variant="ghost" isLazy={true}>
            <MenuButton bg="gray.200" fontWeight="normal" as={Button}
                        rightIcon={<PiCaretDown/>}>
                Permissions
            </MenuButton>
            <Portal>
                <MenuList>
                    {
                        value && value.length > 0 ?
                            permissionList
                                .filter(permission => value?.includes(permission.name))
                                .map((permission, index) => (
                                    <MenuItem key={index}>{permission.description}</MenuItem>
                                )) :
                            <MenuItem>No permissions</MenuItem>
                    }
                </MenuList>
            </Portal>
        </Menu>
    );
}

export default PermissionList;