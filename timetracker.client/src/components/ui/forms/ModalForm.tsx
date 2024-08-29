import { cloneElement, isValidElement } from "react";
import {
    Button,
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
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import { Form, Formik } from "formik";

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
                <ModalContent>
                    <ModalHeader>
                        <Flex gap="2" align="center">
                            {titleIcon}
                            <Text>{title}</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <CustomHorizontalDivider/>
                    <Formik
                        initialValues={props.initialValues}
                        validationSchema={props.validationSchema}
                        onSubmit={(values, actions) => {
                            onSubmit(values, actions);
                            actions.setSubmitting(false);
                        }}
                    >
                        <Form>
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
                        </Form>
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalForm;
