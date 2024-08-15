import { useDispatch } from "react-redux";
import { PiCaretDown, PiClockUser, PiUserMinus, PiUserSwitch } from "react-icons/pi";
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
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuExpandedBtn } from "@components/ui/action-menu";
import CreateEditMemberForm from "./CreateEditMemberForm.tsx";

import { deleteUser, updateUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { EmployeeProps } from "@interfaces/components.ts";
import { permissionList, positionList } from "@constants";
import { UserModel } from "@interfaces/domain.ts";

function Employee({ employee }: EmployeeProps) {
    const userId = useAppSelector(state => state.authentication.user?.id);

    const { id, name, surname, email, position, permissions, timeload, isEmployed } = employee;
    const {
        description: positionName,
        icon: positionIcon
    } = positionList.find(pos => pos.name === position) || {};
    const itsYou = id === userId;

    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(deleteUser(id as string))
    }

    function handleToggleEmployed() {
        const newEmployee: UserModel = { id, isEmployed: !isEmployed };
        dispatch(updateUser(newEmployee))
    }

    return (
        <>
            <ListItem
                display="flex"
                alignItems="center"
                gap="5"
                px="5"
                py="4"
                rounded="md"
                bg={`${isEmployed ? "" : "gray.200"}`}
            >
                <Img
                    alt="user-img"
                    w="28px"
                    h="28px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                />
                <Flex align="center" justify="space-between">
                    <Flex direction="column" w="56">
                        <Text> {`${name} ${surname} ${itsYou ? "(you)" : ""}`}</Text>
                        <Text fontSize="sm" color="gray.500" noOfLines={1}>
                            {email}
                        </Text>
                    </Flex>
                    <CustomVerticalDivider/>
                    {isEmployed && (
                        <>
                            <Flex py="2" w={32} gap="2" align="center" lineHeight="1.1">
                                <Icon boxSize={6} as={positionIcon}/>
                                <Text>{positionName}</Text>
                            </Flex>
                            <CustomVerticalDivider/>
                            <Menu variant="ghost">
                                <MenuButton bg="gray.200" fontWeight="normal" as={Button} rightIcon={<PiCaretDown/>}>
                                    Permissions
                                </MenuButton>
                                <MenuList>
                                    {
                                        permissions && permissions.length > 0 ?
                                            permissionList
                                                .filter(permission => permissions?.includes(permission.name))
                                                .map((permission, index) => (
                                                    <MenuItem key={index}>{permission.description}</MenuItem>
                                                )) :
                                            <MenuItem>No permissions</MenuItem>
                                    }
                                </MenuList>
                            </Menu>
                            <CustomVerticalDivider/>
                            <Flex
                                align="center"
                                gap="2"
                                px="5"
                                py="2"
                                bg="gray.200"
                                rounded="md"
                            >
                                <PiClockUser size="24px"/>
                                <Text>{timeload?.slice(0, -3)}</Text>
                            </Flex>
                        </>
                    )}
                    {!isEmployed && (
                        <Flex
                            align="center"
                            w="30"
                            gap="2"
                            px="5"
                            py="2"
                            fontWeight="bolder"
                            opacity="80%"
                            bg="red.500"
                            color="gray.50"
                            rounded="md"
                        >
                            <Text>Terminated</Text>
                        </Flex>
                    )}
                </Flex>
                <Spacer/>

                {!itsYou &&
                    <ActionMenu>
                        <CreateEditMemberForm formData={employee} isEditing>
                            <ActionMenuEditBtn/>
                        </CreateEditMemberForm>
                        <Divider/>
                        <ActionMenuExpandedBtn
                            confirmText={`${isEmployed ? "Terminate" : "Rehire"} ${name} ${surname} ${isEmployed ? "from" : "by"} the company`}
                            onClick={handleToggleEmployed}
                            buttonName={`${isEmployed ? "Terminate" : "Rehire"}`}
                            buttonColor={`${isEmployed ? "yellow.500" : "green.500"}`}
                            buttonIcon={isEmployed ? <PiUserMinus size="24px"/> : <PiUserSwitch size="24px"/>}
                        />
                        <Divider/>
                        <ActionMenuDeleteBtn
                            confirmText={`Delete ${name} ${surname} from company history`}
                            onClick={handleDelete}
                        />
                    </ActionMenu>
                }
            </ListItem>
            <Divider borderColor="gray.300" borderWidth="1.5px"/>
        </>
    );
}

export default Employee;