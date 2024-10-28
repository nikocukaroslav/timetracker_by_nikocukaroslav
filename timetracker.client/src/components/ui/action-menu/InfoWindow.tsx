import { cloneElement, isValidElement, RefObject, useRef } from "react";
import { PiInfo } from "react-icons/pi";
import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

import { InfoWindowProps } from "@interfaces/components.ts";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

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
                        <Flex gap={2} align="center">
                            <PiInfo size="24px"/>
                            <Text>Information</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <CustomHorizontalDivider/>

                    <ModalBody pb={5}>
                        <Stack gap={2}>
                            {info}
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default InfoWindow;
