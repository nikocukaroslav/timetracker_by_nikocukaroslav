import { cloneElement, FormEvent, isValidElement } from "react";
import {
    Button, Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/react";

import { FilterDrawerProps } from "@interfaces/components.ts";

function FilterDrawer({ children, triggerBtn, isOpen, onOpen, onClose, onSubmit, onClear }: FilterDrawerProps) {

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
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size="sm"
            >
                <DrawerOverlay/>
                <DrawerContent>
                        <DrawerCloseButton/>
                        <DrawerHeader>Filter</DrawerHeader>
                        <Divider borderColor="gray.300" borderWidth="1.5px"/>
                    <DrawerBody>
                        <form id="filterForm" onSubmit={handleSubmit}>
                            {children}
                        </form>
                    </DrawerBody>
                    <Divider borderColor="gray.300" borderWidth="1.5px"/>
                        <DrawerFooter justifyContent="space-between">
                            <Button
                                colorScheme="red"
                                variant="outline"
                                onClick={onClear}
                            >
                                Clear Filters
                            </Button>
                            <Button type="submit" form="filterForm">Filter</Button>
                        </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default FilterDrawer;