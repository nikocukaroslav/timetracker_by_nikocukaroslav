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
    Show,
    Spacer,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuExpandedBtn } from "@components/ui/action-menu";
import CreateEditMemberForm from "./CreateEditMemberForm.tsx";
import StatusLabel from "@components/ui/StatusLabel.tsx";
import TitledText from "@components/ui/TitledText.tsx";

import { deleteUser, updateUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { EmployeeProps } from "@interfaces/components.ts";
import { permissionList, positionList } from "@constants";
import { UserModel } from "@interfaces/domain.ts";
import { timeConverter } from "@utils/formatters.ts";

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

    const fullName = `${name} ${surname} ${itsYou ? "(you)" : ""}`;
    const timeloadString = timeload ? timeConverter(timeload, "hh:mm") : "";

    const positionTitle = useBreakpointValue({ base: positionName, xl: "" });
    const timeloadTitle = useBreakpointValue({ base: timeloadString, lg: "" });

    return (
        <>
            <ListItem
                position="relative"
                display="flex"
                alignItems="center"
                px="5"
                py="4"
                rounded="md"
            >
                {!isEmployed &&
                    <StatusLabel label="Terminated" bgColor="red.500" color="gray.50"/>
                }
                <Img
                    alt="user-img"
                    w="28px"
                    h="28px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                />
                <Flex align="center" justify="space-between" ml="5">
                    <Flex direction="column" w={{ xl: "14rem", lg: "10rem", base: "7rem" }}>
                        <TitledText title={fullName}>
                            {fullName}
                        </TitledText>
                        <TitledText title={fullName} fontSize="sm" color="gray.500">
                            {email}
                        </TitledText>
                    </Flex>
                    {isEmployed && (
                        <>
                            <CustomVerticalDivider/>
                            <Flex py="2" w={{ xl: 32, base: 8 }} justifyContent={{ xl: "flex-start", base: "center" }}
                                  gap="2" align="center" lineHeight="1.1">
                                <Icon boxSize={6} as={positionIcon} title={positionTitle}/>
                                <Show above="xl">
                                    <Text>{positionName}</Text>
                                </Show>
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
                                w={{ lg: 32, base: 16 }}
                            >
                                <PiClockUser size="24px" title={timeloadTitle}/>
                                <Show above="lg">
                                    <Text>{timeloadString}</Text>
                                </Show>
                            </Flex>
                        </>
                    )}
                    <CustomVerticalDivider/>
                </Flex>
                <Spacer/>
                {!itsYou &&
                    <ActionMenu>
                        {isEmployed &&
                            <CreateEditMemberForm formData={employee} isEditing>
                                <ActionMenuEditBtn/>
                            </CreateEditMemberForm>
                        }
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