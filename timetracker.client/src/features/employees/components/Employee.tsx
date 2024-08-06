import {
    Button,
    Divider,
    Flex,
    Icon,
    IconButton,
    Img,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text
} from "@chakra-ui/react";
import {PiCaretDown, PiClockUser, PiCode, PiNotePencil, PiTrash} from "react-icons/pi";
import {useDispatch} from "react-redux";
import {MANAGE_USERS, permissionList} from "../../../constants.ts";
import CreateMemberForm from "./CreateMemberForm.tsx";
import {useState} from "react";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {EmployeeProps} from "../../../interfaces/components.ts";
import CustomVerticalDivider from "../../../components/ui/CustomVerticalDivider.tsx";
import {GrMoney, GrUserManager} from "react-icons/gr";
import {FiMenu} from "react-icons/fi";
import ConfirmActionWindow from "./ConfirmActionWindow.tsx";
import {deleteUser, getUser} from "../api/actions.ts";


function Employee({employee}: EmployeeProps) {
    const [active, setActive] = useState(false);
    const [activeDeleting, setActiveDeleting] = useState(false);
    const userId = useAppSelector(state => state.authentication.userId);

    const dispatch = useDispatch();

    const itsYou = employee.id === userId;

    function handleActiveDeleting() {
        setActiveDeleting(!activeDeleting);
    }

    function handleActive() {
        setActive(!active);
    }

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
                                icon={<PiNotePencil size="24px"/>} onClick={() => {
                                handleActive();
                                dispatch(getUser(employee.id))
                            }}>
                                Edit
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                color="red.600"
                                icon={<Icon as={PiTrash} h="24px" w="24px" color="red.600"/>}
                                onClick={handleActiveDeleting}
                            >
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                }
            </ListItem>
            <Divider borderColor="gray.300" borderWidth="1.5px"/>
            <CreateMemberForm isOpen={active} onClose={handleActive} isEditing/>
            <ConfirmActionWindow onDelete={() => dispatch(deleteUser(employee.id))} employee={employee}
                                 isOpen={activeDeleting}
                                 onClose={handleActiveDeleting}/>
        </>
    );
}

export default Employee;