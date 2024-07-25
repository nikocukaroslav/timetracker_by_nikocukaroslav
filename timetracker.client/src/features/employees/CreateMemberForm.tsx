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
    Text,
} from "@chakra-ui/react";
import {useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";
import {PiUser} from "react-icons/pi";
import CustomInput from "../../components/ui/CustomInput.tsx";
import CustomCheckbox from "../../components/ui/CustomCheckbox.tsx";

interface UserFormControls {
    isOpen: boolean;
    onClose: () => void;
}

const permissions = [
    "approve requests",
    "check calendar",
    "create members",
    "schedule meetings",
];

function CreateMemberForm({isOpen, onClose}: UserFormControls) {
    const [showPassword, setShowPassword] = useState(false);

    function handleClick() {
        setShowPassword(!showPassword);
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
                            <CustomInput type="text" required/>
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Surname</Text>
                            <CustomInput type="text" required/>
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Email</Text>
                            <CustomInput type="text" required/>
                        </FormLabel>
                        <FormLabel display="flex" flexDirection="column" gap="1">
                            <Text>Password</Text>
                            <InputGroup>
                                <CustomInput
                                    type={showPassword ? "text" : "password"}
                                    required
                                />
                                <InputRightElement>
                                    <Box w="24px" onClick={handleClick}>
                                        {showPassword ? (
                                            <BiHide size="md"/>
                                        ) : (
                                            <BiShow size="md"/>
                                        )}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
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
                            {permissions.map((permission) => {
                                return (
                                    <ListItem>
                                        <FormLabel
                                            m="0"
                                            display="flex"
                                            fontWeight="normal"
                                            gap="2"
                                            alignContent="center"
                                        >
                                            <CustomCheckbox/>
                                            <Text>{permission}</Text>
                                        </FormLabel>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreateMemberForm;
