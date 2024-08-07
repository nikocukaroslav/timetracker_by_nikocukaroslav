import { useState } from "react";
import { useDispatch } from "react-redux";
import { PiCaretDown, PiClockUser, PiCode } from "react-icons/pi";
import { GrMoney, GrUserManager } from "react-icons/gr";
import {
    Button,
    Divider,
    Flex,
    Icon,
    Img,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text
} from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ConfirmActionWindow from "@components/ui/ConfirmActionWindow.tsx";
import CustomHamburgerMenu from "@components/ui/CustomHamburgerMenu.tsx";
import CreateMemberForm from "./CreateMemberForm.tsx";

import { deleteUser, getUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { EmployeeProps } from "@interfaces/components.ts";
import { MANAGE_USERS, permissionList } from "@constants";


function Employee({employee}: EmployeeProps) {
    const [active, setActive] = useState(false);
    const [activeDeleting, setActiveDeleting] = useState(false);
    const userId = useAppSelector(state => state.authentication.user.id);

    function handleActiveDeleting() {
        setActiveDeleting(!activeDeleting);
    }

    function handleActive() {
        setActive(!active);
    }

    const dispatch = useDispatch();

    const itsYou = employee.id === userId;

    function handleColor(timeload) {
        if (timeload >= 100)
            return "green.500";
        else if (timeload >= 50 && timeload < 100)
            return "orange.500";
        else if (timeload < 50)
            return "red.500";

    }

    function handleIcon(position) {
        if (position === "manager")
            return GrUserManager
        else if (position === "developer")
            return PiCode
        else if (position === "accountant")
            return GrMoney
    }

    function getData() {
        handleActive();
        dispatch(getUser(employee.id))
    }

    return (
        <>
            <ListItem rounded="md" py="4" display="flex" alignItems="center"
                      gap="5" px="5"
            >
                <Img
                    alt="user-img"
                    w="28px"
                    h="28px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                />
                <Flex align="center" justify="space-between">
                    <Flex direction="column" w="56">
                        <Text> {`${employee.name} ${employee.surname} ${itsYou ? "(you)" : ""}`}</Text>
                        <Text fontSize="sm" color="gray.500" noOfLines={1}>
                            {employee.email}
                        </Text>
                    </Flex>
                    <CustomVerticalDivider/>
                    <Flex py="2" gap="2" w="28" align="center" lineHeight="1.1">
                        <Icon
                            h="24px" w="24px"
                            as={handleIcon(employee.position)}
                        />
                        <Text>{employee.position}</Text>
                    </Flex>
                    <CustomVerticalDivider/>
                    <Menu variant="ghost">
                        <MenuButton bg="gray.200" fontWeight="normal" as={Button} rightIcon={<PiCaretDown/>}>
                            Permissions
                        </MenuButton>
                        <MenuList>
                            {
                                employee.permissions.length > 0 ?
                                    permissionList
                                        .filter(permission => employee.permissions.includes(permission.name))
                                        .map((permission, index) => (
                                            <MenuItem key={index}>{permission.description}</MenuItem>
                                        )) :
                                    <MenuItem>No permissions</MenuItem>
                            }
                        </MenuList>
                    </Menu>
                    <CustomVerticalDivider/>
                    <Flex
                        w="28" align="center" gap="2" py="2" fontWeight="bolder"
                        opacity="80%"
                        bg={handleColor(employee.timeload)}
                        color="gray.50"
                        rounded="md"
                        px="5"
                    ><PiClockUser size="24px"/> <Text>{employee.timeload}%</Text>
                    </Flex>

                </Flex>
                <Spacer/>

                {!itsYou && (!employee.permissions.includes(MANAGE_USERS)) &&
                    <CustomHamburgerMenu getData={getData} confirmAction={handleActiveDeleting}/>
                }
            </ListItem>
            <Divider borderColor="gray.300" borderWidth="1.5px"/>
            <CreateMemberForm isOpen={active} onClose={handleActive} isEditing/>
            <ConfirmActionWindow onDelete={() => dispatch(deleteUser(employee.id))}
                                 isOpen={activeDeleting}
                                 text={`Delete ${employee.name} ${employee.surname} from company history`}
                                 onClose={handleActiveDeleting}/>
        </>
    );
}

export default Employee;