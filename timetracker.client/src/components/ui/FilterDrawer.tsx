import { cloneElement, FormEvent, isValidElement } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/react";

import { FilterDrawerProps } from "@interfaces/components.ts";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

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
                    <CustomHorizontalDivider/>
                    <DrawerBody>
                        <form id="filterForm" onSubmit={handleSubmit}>
                            {children}
                        </form>
                    </DrawerBody>
                    <CustomHorizontalDivider/>
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