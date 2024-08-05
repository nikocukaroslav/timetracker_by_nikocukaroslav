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
import {MANAGE_OWN_TIME, permissionList, positionsList} from "../../../constants.ts";
import {useDispatch} from "react-redux";
import {createUser, updateUser} from "../employeesSlice.ts";
import {generatePassword} from "../../../utils/generatePassword.ts";
import PermissionItem from "./PermissionItem.tsx";
import RandomPasswordButton from "./RandomPasswordButton.tsx";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import CustomSlider from "../../../components/ui/CustomSlider.tsx";
import {UserFormControls} from "../../../interfaces/components.ts";

function CreateMemberForm({isOpen, onClose, isEditing}: UserFormControls) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("developer");
    const [permissions, setPermissions] = useState<string[]>([]);
    const [timeload, setTimeload] = useState(100);

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
            setPosition(user.position || "developer");
            setPermissions(user.permissions || []);
            setTimeload(user.timeload || 100)
        }
    }, [user, isEditing]);

    function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const userToUpdate = {
            id: user.id,
            position,
            permissions,
            timeload,
        };

        console.log(userToUpdate)
        dispatch(updateUser(userToUpdate))

        onClose()
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newUser = {
            name,
            surname,
            email,
            password,
            position,
            permissions,
            timeload,
        };

        dispatch(createUser(newUser));

        onClose()

        setName("")
        setSurname("")
        setEmail("")
        setPassword("")
        setPosition("developer")
        setPermissions([])
        setTimeload(100)
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
                    return handleUpdate(e);
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
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Position</Text>
                            <Select
                                variant="outline"
                                borderColor="gray.300"
                                focusBorderColor="gray.500"
                                onChange={e => setPosition(e.target.value)}
                            >
                                {
                                    positionsList.map(position =>
                                        <option key={position.name}>{position.description}</option>
                                    )
                                }
                            </Select>
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
                        {
                            !permissions.includes(MANAGE_OWN_TIME) &&
                            <FormLabel display="flex" flexDirection="column">
                                <Text>Work time (%)</Text>
                                <CustomSlider onChange={setTimeload} value={timeload}/>
                            </FormLabel>
                        }

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
                                    <PermissionItem
                                        key={permission.name} permission={permission}
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
