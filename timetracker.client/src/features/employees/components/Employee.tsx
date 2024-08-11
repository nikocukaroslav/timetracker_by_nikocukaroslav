import { useDispatch } from "react-redux";
import { PiCaretDown, PiClockUser } from "react-icons/pi";
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
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuTerminateBtn } from "@components/ui/action-menu";
import CreateEditMemberForm from "./CreateEditMemberForm.tsx";

import { deleteUser, updateUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { EmployeeProps } from "@interfaces/components.ts";
import { permissionList, positionsList } from "@constants";
import { UserModel } from "@interfaces/domain.ts";

function Employee({employee}: EmployeeProps) {
    const userId = useAppSelector(state => state.authentication.user?.id);
    const {
        description: positionName,
        icon: positionIcon
    } = positionsList.find(pos => pos.name === employee.position) || {};

    const dispatch = useDispatch();

    const itsYou = employee.id === userId;

    function handleColor(timeload?: number) {
        if (!timeload) return "gray.300";

        if (timeload >= 100)
            return "green.500";
        else if (timeload >= 50 && timeload < 100)
            return "orange.500";
        else if (timeload < 50)
            return "red.500";
    }

    function handleDelete() {
        dispatch(deleteUser(employee.id as string))
    }

    function handleTerminate() {
        const newEmployee: UserModel = { id: employee.id, isEmployed: false };
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
                bg = {`${employee.isEmployed ? "" : "gray.200"}`}
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
                                employee.permissions && employee.permissions.length > 0 ?
                                    permissionList
                                        .filter(permission => employee.permissions?.includes(permission.name))
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
                        w="28"
                        gap="2"
                        px="5"
                        py="2"
                        fontWeight="bolder"
                        opacity="80%"
                        bg={handleColor(employee?.timeload)}
                        color="gray.50"
                        rounded="md"
                    >
                        <PiClockUser size="24px"/>
                        <Text>{employee.timeload}%</Text>
                    </Flex>

                </Flex>
                <Spacer/>

                {!itsYou &&
                    <ActionMenu>
                        <CreateEditMemberForm formData={employee} isEditing>
                            <ActionMenuEditBtn/>
                        </CreateEditMemberForm>
                        <Divider/>
                        <ActionMenuDeleteBtn
                            confirmText={`Delete ${employee.name} ${employee.surname} from company history`}
                            onClick={handleDelete}
                        />
                        <Divider/>
                        <ActionMenuTerminateBtn
                            confirmText={`Terminate ${employee.name} ${employee.surname} from company`}
                            onClick={handleTerminate}
                        />
                    </ActionMenu>
                }
            </ListItem>
            <Divider borderColor="gray.300" borderWidth="1.5px"/>
        </>
    );
}

export default Employee;