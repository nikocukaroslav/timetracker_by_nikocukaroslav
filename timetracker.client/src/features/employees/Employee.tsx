import {
    Box,
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
import {PiCaretDown, PiNotePencil, PiTrash} from "react-icons/pi";
import {deleteUser} from "./employeesSlice.ts";
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";


function Employee({employee}) {
    const dispatch: Dispatch = useDispatch();

    return (
        <Box>
            <ListItem rounded="md" py="4" display="flex" alignItems="center"
                      gap="5" px="5"
            >
                <Img
                    alt="user-img"
                    w="28px"
                    h="28px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                />
                <Flex align="center" w="40%" justify="space-between">
                    <Flex direction="column" w="33%">
                        <Text> {`${employee.name} ${employee.surname}`}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {employee.email}
                        </Text>
                    </Flex>

                    <Text
                        bg={`${employee.employeeType === "full-time" ? "green.500" : "yellow.500"}`}
                        py="1" w="96px" align="center" fontWeight="bolder" color="gray.50"
                        rounded="md">{employee.employeeType}
                    </Text>

                    <Menu variant="ghost">
                        <MenuButton bg="gray.50" as={Button} rightIcon={<PiCaretDown/>}>
                            Permissions
                        </MenuButton>
                        <MenuList key={employee.id}>
                            {
                                (employee.permissions).map((permission, index) => {
                                    if (permission)
                                        return <MenuItem key={index}>{permission}</MenuItem>
                                    else
                                        return <MenuItem key={index}>No permissions</MenuItem>
                                })
                            }
                        </MenuList>

                    </Menu>
                </Flex>
                <Spacer/>
                <Button variant="ghost" p="0"><Icon as={PiNotePencil} h="24px"
                                                    w="24px"/></Button>
                <Button onClick={() => dispatch(deleteUser(employee.id))}
                        variant="ghost" p="0">
                    <Icon as={PiTrash}
                          h="24px"
                          w="24px"
                          color="red.600"/>
                </Button>
            </ListItem>
            <Divider borderColor="gray.300" borderWidth="1.5px"/>
        </Box>
    );
}

export default Employee;