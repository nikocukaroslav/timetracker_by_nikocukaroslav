import { useRef, useState } from "react";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";

import CalendarCell from "@features/calendar/components/CalendarCell.tsx";
import CreateEditWorkDayForm from "@features/calendar/components/CreateEditWorkDayForm.tsx";

import { getCalendarBounds } from "@features/calendar/utils/getCalendarBounds.ts";

function CalendarBody({ currentDate }: { currentDate: Date }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const selecting = useRef<boolean>(false);
    const selectedItemsRef = useRef<string[]>([]);

    const { startDate, dayCount } = getCalendarBounds(currentDate.getFullYear(), currentDate.getMonth());

    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleSelect(day: string) {
        if (selecting.current && !selectedItemsRef.current.includes(day)) {
            selectedItemsRef.current.push(day);
            setSelectedItems(prevData => [...prevData, day]);
        }
    }

    function handleEndSelect() {
        if (selecting.current) {
            selecting.current = false;
            onOpen();
        }
    }

    function handleCloseForm() {
        onClose();
        selectedItemsRef.current = [];
        setSelectedItems([]);
    }

    return (
        <SimpleGrid columns={7} w="full" h="full">
            {[...Array(dayCount)].map((_, i) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);

                return <CalendarCell
                    key={i}
                    selecting={selecting}
                    date={date}
                    selectedItems={selectedItems}
                    onEndSelect={handleEndSelect}
                    onSelect={handleSelect}
                />;
            })}
            <CreateEditWorkDayForm
                selectedItems={selectedItemsRef}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={handleCloseForm}/>
        </SimpleGrid>
    );
}

export default CalendarBody;
