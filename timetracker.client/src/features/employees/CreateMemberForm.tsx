import {
    Box,
    Button,
    Divider,
    Flex,
    FormLabel,
    InputGroup,
    InputRightElement,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";
import {PiDiceThree, PiUser} from "react-icons/pi";
import CustomInput from "../../components/ui/CustomInput.tsx";
import CustomCheckbox from "../../components/ui/CustomCheckbox.tsx";
import {permissionList} from "../../constants.ts";
import {useDispatch} from "react-redux";
import {createUser} from "./employeesSlice.ts";
import {generatePassword} from "../../utils/generatePassword.ts";

interface UserFormControls {
    isOpen: boolean;
    onClose: () => void;
}

function CreateMemberForm({isOpen, onClose}: UserFormControls) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeType, setEmployeeType] = useState("full-time");
    const [permissions, setPermissions] = useState<string[]>([]);

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleSubmit() {
        const newUser = {
            name,
            surname,
            email,
            password,
            employeeType,
            permissions: permissions.toString(),
        };

        dispatch(createUser(newUser));
    }

    function handlePermissions(
        e: ChangeEvent<HTMLInputElement>,
        permission: string
    ) {
        setPermissions((prevPermissions) =>
            e.target.checked
                ? [...prevPermissions, permission]
                : prevPermissions.filter((perm) => perm !== permission)
        );
    }

    useEffect(() => {
        if (employeeType === "part-time") {
            setPermissions((prevPermissions) =>
                prevPermissions.includes("WORKING_PART_TIME")
                    ? prevPermissions
                    : [...prevPermissions, "WORKING_PART_TIME"]
            );
        } else {
            setPermissions((prevPermissions) =>
                prevPermissions.filter((perm) => perm !== "WORKING_PART_TIME")
            );
        }
    }, [employeeType]);

    function setRandomPassword() {
        setPassword(generatePassword());
    }

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="xl"
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Flex gap="2" align="center">
                        <PiUser size="24px"/>
                        <Text>New member</Text>
                    </Flex>
                </ModalHeader>
                <Divider borderColor="gray.300" borderWidth="1.5px"/>
                <ModalBody>
                    <Flex direction="column" gap="2">
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Name</Text>
                            <CustomInput
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Surname</Text>
                            <CustomInput
                                type="text"
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Email</Text>
                            <CustomInput
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormLabel>
                        <Box position="relative">
                            <FormLabel display="flex" flexDirection="column" gap="1">
                                <Text>Password</Text>
                                <InputGroup>
                                    <CustomInput
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <InputRightElement>
                                        <Box w="24px" onClick={handleClick}>
                                            {showPassword ? (
                                                <BiHide size="24"/>
                                            ) : (
                                                <BiShow size="24"/>
                                            )}
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>
                            </FormLabel>
                            <Button
                                position="absolute"
                                top="0"
                                right="2"
                                variant="ghost"
                                size="xs"
                                onClick={setRandomPassword}
                            >
                                <Flex gap="1">
                                    <PiDiceThree size="18px"/> <Text mt="2px">Generate</Text>
                                </Flex>
                            </Button>
                        </Box>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Employee Type</Text>
                            <Select onChange={(e) => setEmployeeType(e.target.value)}>
                                <option value="full-time">full-time</option>
                                <option value="part-time">part-time</option>
                            </Select>
                        </FormLabel>

                        <FormLabel m="0">
                            <Text>Permissions</Text>
                        </FormLabel>
                        <List
                            flexWrap="wrap"
                            display="flex"
                            gap="4"
                            lineHeight="1"
                            borderWidth="1px"
                            p="3"
                            rounded="md"
                        >
                            {permissionList.map((permission) => {
                                return (
                                    <ListItem key={permission.name}>
                                        <FormLabel
                                            m="0"
                                            display="flex"
                                            fontWeight="normal"
                                            gap="2"
                                            alignContent="center"
                                        >
                                            <CustomCheckbox
                                                onChange={(e) =>
                                                    handlePermissions(e, permission.name)
                                                }
                                            />
                                            <Text>{permission.description}</Text>
                                        </FormLabel>
                                    </ListItem>
                                );
                            })}
                            {
                                employeeType === "part-time" && <ListItem>
                                    <FormLabel
                                        m="0"
                                        display="flex"
                                        fontWeight="normal"
                                        gap="2"
                                        alignContent="center"
                                    >
                                        <CustomCheckbox
                                            onChange={(e) =>
                                                handlePermissions(e, "WORKING_PART_TIME")
                                            }
                                            disabled
                                            checked
                                        />
                                        <Text>working part-time</Text>
                                    </FormLabel>
                                </ListItem>
                            }
                        </List>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreateMemberForm;
