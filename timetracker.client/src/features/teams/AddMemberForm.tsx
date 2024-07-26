import {
   Button,
   Divider,
   Flex,
   Img,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Spacer,
   Text,
} from "@chakra-ui/react";
import {PiMagnifyingGlass, PiUsersThree} from "react-icons/pi";
import CustomInput from "../../components/ui/CustomInput.tsx";
import CustomCheckbox from "../../components/ui/CustomCheckbox.tsx";

interface UserFormControls {
    isOpen: boolean;
    onClose: () => void;
}

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export const users: User[] = [
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "yarek",
        surname: "nikonchyk",
        email: "nikoc@gmail.com",
    },
    {
        id: 13213112312,
        name: "petro",
        surname: "grib",
        email: "nikoc@gmail.com",
    },
];

function AddMemberForm({isOpen, onClose}: UserFormControls) {
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
                    <Flex align="center" justifyContent="space-between">
                        <Flex gap="2" align="center">
                            <PiUsersThree size="32px"/>
                            <Text>Select members</Text>
                        </Flex>
                        <Flex gap="2" align="center" w="50%">
                            <CustomInput type="text"/>
                            <PiMagnifyingGlass size="28"/>
                        </Flex>
                    </Flex>
                </ModalHeader>
                <Divider borderColor="gray.300" borderWidth="1.5px"/>
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gap="2"
                    maxHeight="50dvh"
                    overflow="auto"
                >
                    {users.map((user) => {
                        return (
                            <Flex
                                key={user.id}
                                py="2"
                                shadow="sm"
                                align="center"
                                bg="gray.100"
                                rounded="md"
                                gap="5"
                                px="5"
                            >
                                <Img
                                    alt="user-img"
                                    w="28px"
                                    h="28px"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                />
                                <Flex direction="column">
                                    <Text>
                                        {user.name} {user.surname}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {user.email}
                                    </Text>
                                </Flex>
                                <Spacer/>
                                <CustomCheckbox/>
                            </Flex>
                        );
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button colorScheme="gray">Add</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddMemberForm;
