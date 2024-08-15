import { cloneElement, isValidElement } from "react";
import {
    Divider,
    Modal as BaseModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

function Modal({ title, triggerBtn, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const TriggerButton = () =>
        isValidElement(triggerBtn) ? cloneElement(triggerBtn, { onClick: onOpen } as { onClick: () => void }) : null;

    return (
        <>
            <TriggerButton/>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton/>

                    <Divider borderColor="gray.300" borderWidth="1.5px"/>

                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </BaseModal>
        </>
    );
}

export default Modal;
