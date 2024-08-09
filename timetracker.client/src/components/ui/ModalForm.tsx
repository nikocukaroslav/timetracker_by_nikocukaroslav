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
    Text
} from "@chakra-ui/react";

import { ModalFormProps } from "@interfaces/components.ts";
import { FormEvent } from "react";

function ModalForm(props: ModalFormProps) {
    const {
        title,
        titleIcon,
        isOpen,
        onClose,
        onSubmit,
        submitBtnLoading,
        submitBtnText,
        children
    } = props;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit();
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
    );
}

export default ModalForm;