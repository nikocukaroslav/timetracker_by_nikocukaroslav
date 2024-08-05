import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text} from "@chakra-ui/react";

function ConfirmActionWindow({onClose, isOpen, onDelete, employee}) {
    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Confirm action</ModalHeader>
                <ModalBody>
                    <Text>Delete {employee.name} {employee.surname} from company history</Text>
                </ModalBody>
                <ModalFooter gap="2">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onDelete} colorScheme="red">Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmActionWindow;