import { ReactNode } from "react";
import { FiMenu } from "react-icons/fi";
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";

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
            <MenuList>
                {children}
            </MenuList>
        </Menu>
    );
}

export default ActionMenu;