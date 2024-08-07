import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

function ConfirmActionWindow({onClose, isOpen, onDelete, text}) {
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
                    <Text>{text}</Text>
                </ModalBody>
                <ModalFooter gap="2">
                    <Button onClick={onClose} variant="ghost">Cancel</Button>
                    <Button onClick={onDelete} colorScheme="red">Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmActionWindow;