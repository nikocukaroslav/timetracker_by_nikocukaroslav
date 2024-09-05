import { useDispatch } from "react-redux";
import { PiClockUser, PiToolbox, PiUserMinus, PiUserSwitch } from "react-icons/pi";
import { Divider, Flex, Icon, Img, ListItem, Show, Spacer, Text, useBreakpointValue } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuExpandedBtn } from "@components/ui/action-menu";
import CreateEditMemberForm from "./CreateEditMemberForm.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import StatusLabel from "@components/ui/StatusLabel.tsx";
import TitledText from "@components/ui/TitledText.tsx";

import { deleteUser, updateUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { EmployeeProps } from "@interfaces/components.ts";
import { UserModel } from "@interfaces/domain.ts";
import { convertTime } from "@utils/formatters.ts";
import PermissionsList from "@features/employees/components/PermissionsList.tsx";

function Employee({ employee }: EmployeeProps) {
    const userId = useAppSelector(state => state.authentication.user?.id);

    const { id, name, surname, email, role, permissions, timeload, isEmployed } = employee;
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
    const timeloadString = timeload ? convertTime(timeload, "hh:mm") : "";

    const roleTitle = useBreakpointValue({ base: role?.name, xl: "" });
    const timeloadTitle = useBreakpointValue({ base: timeloadString, lg: "" });

    return (
        <>
            <ListItem
                position="relative"
                display="flex"
                alignItems="center"
                p="5"
                rounded="md"
            >
                {!isEmployed &&
                    <StatusLabel label="Terminated" bgColor="red.500" borderColor="red.500" color="gray.50"/>
                }
                <Img
                    alt="user-img"
                    w="28px"
                    h="28px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                />
                <Flex align="center" justify="space-between" ml="5">
                    <Flex direction="column" w={{ xl: "16rem", lg: "10rem", base: "7rem" }}>
                        <TitledText title={fullName}>
                            {fullName}
                        </TitledText>
                        <TitledText title={email} fontSize="sm" color="gray.500">
                            {email}
                        </TitledText>
                    </Flex>
                    {isEmployed && (
                        <>
                            <CustomVerticalDivider/>
                            <Flex py="2" w={{ xl: 32, base: 8 }} gap="2" align="center" justifyContent="center"
                                  lineHeight="1.1">
                                <Icon boxSize={6} as={PiToolbox} title={roleTitle}/>
                                <Show above="xl">
                                    <Text>{role?.name}</Text>
                                </Show>
                            </Flex>
                            <CustomVerticalDivider/>
                            <PermissionsList value={permissions}/>
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
                </Flex>
                <Spacer/>
                {!itsYou &&
                    <ActionMenu>
                        {isEmployed &&
                            <CreateEditMemberForm
                                formData={{
                                    ...employee,
                                    timeload: convertTime(employee.timeload as string, "hh:mm")
                                }}
                                isEditing
                            >
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
            <CustomHorizontalDivider/>
        </>
    );
}

export default Employee;