import {
    Box,
    Button,
    Divider,
    Flex,
    FormLabel,
    InputGroup,
    InputRightElement,
    List,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spinner,
    Text,
} from "@chakra-ui/react";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";
import {PiUser} from "react-icons/pi";
import CustomInput from "../../../components/ui/CustomInput.tsx";
import {permissionList} from "../../../constants.ts";
import {useDispatch} from "react-redux";
import {createUser, updateUserPermissions} from "../employeesSlice.ts";
import {generatePassword} from "../../../utils/generatePassword.ts";
import PermissionItem from "./PermissionItem.tsx";
import RandomPasswordButton from "./RandomPasswordButton.tsx";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";


interface UserFormControls {
    isOpen: boolean;
    onClose: () => void;
    isEditing?: boolean;
}

function CreateMemberForm({isOpen, onClose, isEditing}: UserFormControls) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeType, setEmployeeType] = useState("full-time");
    const [permissions, setPermissions] = useState<string[]>([]);

    const [showPassword, setShowPassword] = useState(false);

    const loading = useAppSelector(state => state.employees.loading)
    const user = useAppSelector(state => state.employees.user)


    const dispatch = useDispatch();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (isEditing) {
            setName(user.name || "");
            setSurname(user.surname || "");
            setEmail(user.email || "");
            setEmployeeType(user.employeeType || "full-time");
            setPermissions(user.permissions || []);
        }
    }, [user, isEditing]);

    function updatePermissions(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(updateUserPermissions({permissions, userId: user.id}))

        onClose()
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newUser = {
            name,
            surname,
            email,
            password,
            employeeType,
            permissions,
        };

        dispatch(createUser(newUser));

        onClose()

        setName("")
        setSurname("")
        setEmail("")
        setPassword("")
        setEmployeeType("full-time")
        setPermissions([])
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
            <ModalContent as="form" onSubmit={(e: FormEvent<HTMLFormElement>) => {
                if (!isEditing)
                    return handleSubmit(e);
                else
                    return updatePermissions(e);
            }}>
                <ModalHeader>
                    <Flex gap="2" align="center">
                        <PiUser size="24px"/>
                        <Text>{`${isEditing ? "Edit member" : "New member"}`}</Text>
                    </Flex>
                </ModalHeader>
                <Divider borderColor="gray.300" borderWidth="1.5px"/>
                <ModalBody>
                    <Flex direction="column" gap="2">
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Name</Text>
                            <CustomInput
                                readOnly={isEditing}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Surname</Text>
                            <CustomInput
                                readOnly={isEditing}
                                type="text"
                                onChange={(e) => setSurname(e.target.value)}
                                value={surname}
                                required
                            />
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Email</Text>
                            <CustomInput
                                readOnly={isEditing}
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </FormLabel>
                        {!isEditing && <Box position="relative">
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
                            <RandomPasswordButton setRandomPassword={setRandomPassword}/>
                        </Box>}
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Employee Type</Text>
                            <Select value={employeeType} isDisabled={isEditing}
                                    onChange={(e) => setEmployeeType(e.target.value)}>
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
                                    <PermissionItem key={permission.name} permission={permission}
                                                    permissions={permissions}
                                                    handlePermissions={handlePermissions}/>
                                );
                            })}
                        </List>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button w="16" disabled={loading} type="submit"
                    >{loading ? <Spinner width="24px" h="24px"/> : isEditing ? "Edit" : "Add"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreateMemberForm;
