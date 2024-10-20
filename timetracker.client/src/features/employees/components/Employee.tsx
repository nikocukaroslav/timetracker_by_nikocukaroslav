import { useDispatch } from "react-redux";
import { PiUserMinus, PiUserSwitch } from "react-icons/pi";
import { Divider, Flex, Img, ListItem, Spacer, Text } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuExpandedBtn } from "@components/ui/action-menu";
import CreateEditMemberForm from "./CreateEditMemberForm.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import TitledText from "@components/ui/TitledText.tsx";

import { deleteUser, updateUser } from "@features/employees/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { EmployeeProps } from "@interfaces/components.ts";
import { UserModel } from "@interfaces/domain.ts";
import { convertTime } from "@utils/formatters.ts";
import PermissionList from "@features/employees/components/PermissionList.tsx";

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

    const fullName = ` ${name} ${surname} ${itsYou ? "(you)" : ""} ${isEmployed ? "" : "(Terminated)"}`;
    const timeloadString = timeload ? convertTime(timeload, "hh:mm") : "";

    return (
        <>
            <ListItem
                position="relative"
                display="flex"
                alignItems="center"
                py={4}
                px={5}
                rounded="md"
                bg={`${!isEmployed && "red.100"}`}
            >

                <Flex minW={80} align="center">
                    <Img
                        alt="user-img"
                        w="28px"
                        h="28px"
                        mr="5"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    />
                    <Flex direction="column">
                        <TitledText title={fullName}>
                            {fullName}
                        </TitledText>
                        <TitledText title={email} fontSize="sm" color="gray.500">
                            {email}
                        </TitledText>
                    </Flex>
                </Flex>

                <CustomVerticalDivider/>
                <Flex py="2" minW={24} maxW={24}>
                    <Text isTruncated>{role?.name}</Text>
                </Flex>
                <CustomVerticalDivider/>
                <Flex minW={24} justifyContent="center">
                    <Text>{timeloadString}</Text>
                </Flex>
                <CustomVerticalDivider/>
                <PermissionList value={permissions}/>
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