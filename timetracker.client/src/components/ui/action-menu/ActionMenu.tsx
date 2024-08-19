import { ReactNode } from "react";
import { FiMenu } from "react-icons/fi";
import { IconButton, Menu, MenuButton, MenuList, Portal } from "@chakra-ui/react";

function ActionMenu({children}: { children: ReactNode }) {
    return (
        <Menu>
            <MenuButton
                borderColor="gray.300"
                as={IconButton}
                aria-label='Options'
                icon={<FiMenu size="24px"/>}
                variant='outline'
            />
            <Portal>
                <MenuList>
                    {children}
                </MenuList>
            </Portal>
        </Menu>
    );
}

export default ActionMenu;