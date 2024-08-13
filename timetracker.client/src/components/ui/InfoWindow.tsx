import { cloneElement, isValidElement, RefObject, useRef } from "react";
import { PiInfo } from "react-icons/pi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Text, Flex, Divider,
} from "@chakra-ui/react";

import { InfoWindowProps } from "@interfaces/components.ts";

function InfoWindow({ info, children }: InfoWindowProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef: RefObject<HTMLElement> = useRef(null);

    const TriggerButton = () =>
        isValidElement(children) ? cloneElement(children, { onClick: onOpen } as { onClick: () => void }) : null;

    return (
        <>
            <TriggerButton/>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={cancelRef}
                isCentered
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Flex gap="2" align="center">
                            <PiInfo size="24px"/>
                            <Text>Information</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <Divider borderColor="gray.300" borderWidth="1.5px"/>

                    <ModalBody pb="5">
                        <Flex direction="column" gap="2">
                            {info}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default InfoWindow;
