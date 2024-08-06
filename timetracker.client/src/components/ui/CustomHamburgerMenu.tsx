import {Divider, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FiMenu} from "react-icons/fi";
import {PiNotePencil, PiTrash} from "react-icons/pi";

interface HamburgerProps {
    getData: () => void;
    confirmAction: () => void;
}

function CustomHamburgerMenu({getData, confirmAction}: HamburgerProps) {
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
                <MenuItem
                    icon={<PiNotePencil size="24px"/>} onClick={getData}>
                    Edit
                </MenuItem>
                <Divider/>
                <MenuItem
                    color="red.600"
                    icon={<Icon as={PiTrash} h="24px" w="24px" color="red.600"/>}
                    onClick={confirmAction}
                >
                    Delete
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default CustomHamburgerMenu;