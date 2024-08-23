import {cloneElement, isValidElement} from "react";
import {
    Modal as BaseModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

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

                    <CustomHorizontalDivider/>

                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </BaseModal>
        </>
    );
}

export default Modal;
