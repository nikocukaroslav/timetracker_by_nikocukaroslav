import { cloneElement, isValidElement, RefObject, useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";

import { ConfirmWindowProps } from "@interfaces/components.ts";

function ConfirmWindow({onConfirm, text, children}: ConfirmWindowProps) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef: RefObject<FocusableElement> = useRef();

    const TriggerButton = () =>
        isValidElement(children) ? cloneElement(children, {onClick: onOpen} as { onClick: () => void }) : null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <>
            <TriggerButton/>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="2xl" fontWeight="bold">
                        Confirm action
                    </AlertDialogHeader>

                    <AlertDialogBody>{text}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button variant="ghost" ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default ConfirmWindow;