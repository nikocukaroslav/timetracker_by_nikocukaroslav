import { useRef, useState } from "react";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";

import CalendarCell from "@features/calendar/components/CalendarCell.tsx";
import CreateEditWorkDayForm from "@features/calendar/components/CreateEditWorkDayForm.tsx";

function CalendarBody({ currentDate }: { currentDate: Date }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const selecting = useRef<boolean>(false);
    const selectedItemsRef = useRef<string[]>([]);

    const startMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const dayShift = startMonthDay !== 0 ? startMonthDay : 7;
    const countRows = Math.ceil((dayShift + monthDays) / 7);
    const shownDays = countRows * 7;

    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleSelect(day: string) {
        if (!selectedItemsRef.current.includes(day)) {
            selectedItemsRef.current.push(day);
            setSelectedItems(prevData => [...prevData, day]);
        }
    }

    function handleEndSelect() {
        selecting.current = false;
        onOpen();
    }

    function handleCloseForm() {
        onClose();
        selectedItemsRef.current = [];
        setSelectedItems([]);
    }

    return (
        <SimpleGrid columns={7} w="full" h="full">
            {[...Array(shownDays)].map((_, i) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), (dayShift * -1) + 2 + i);
                
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
