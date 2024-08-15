import { cloneElement, FormEvent, isValidElement } from "react";
import {
    Button,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

import { ModalFormProps } from "@interfaces/components.ts";

function ModalForm(props: ModalFormProps) {
    const {
        title,
        titleIcon,
        isOpen,
        onOpen,
        onClose,
        onSubmit,
        triggerBtn,
        submitBtnLoading = false,
        submitBtnText,
        children
    } = props;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
        onClose();
    }

    const TriggerButton = () =>
        isValidElement(triggerBtn) ? cloneElement(triggerBtn, { onClick: onOpen } as { onClick: () => void }) : null;

    return (
        <>
            <TriggerButton/>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size="xl"
            >
                <ModalOverlay/>
                <ModalContent as="form" onSubmit={handleSubmit}>
                    <ModalHeader>
                        <Flex gap="2" align="center">
                            {titleIcon}
                            <Text>{title}</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>

                    <Divider borderColor="gray.300" borderWidth="1.5px"/>

                    <ModalBody>
                        <Flex direction="column" gap="2">
                            {children}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button w="16" isLoading={submitBtnLoading} type="submit">
                            {submitBtnText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalForm;