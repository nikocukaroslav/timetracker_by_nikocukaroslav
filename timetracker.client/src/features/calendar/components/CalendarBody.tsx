import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";

import CalendarCell from "@features/calendar/components/CalendarCell.tsx";
import CreateEditWorkDayForm from "@features/calendar/components/CreateEditWorkDayForm.tsx";

import { getCalendarBounds } from "@features/calendar/utils/getCalendarBounds.ts";
import { timeConverter } from "@utils/formatters.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { createWorkDays } from "@features/calendar/api/actions.ts";

function CalendarBody({ currentDate }: { currentDate: Date }) {
    const userId = useAppSelector((state) => state.authentication.user?.id);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const selecting = useRef<boolean>(false);
    const selectedItemsRef = useRef<string[]>([]);

    const { startDate, dayCount } = getCalendarBounds(currentDate.getFullYear(), currentDate.getMonth());

    const dispatch = useDispatch();
    const disclosure = useDisclosure();

    const { onOpen, onClose } = disclosure;

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

    function handleCreate({ startTime, endTime }: { startTime: string; endTime: string }) {
        const newWorkDays = {
            days: selectedItemsRef.current,
            startTime: timeConverter(startTime),
            endTime: timeConverter(endTime),
            userId: userId as string,
        }

        dispatch(createWorkDays(newWorkDays))
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
                onCreate={handleCreate}
                disclosure={{
                    ...disclosure,
                    onClose: handleCloseForm
                }}
            />
        </SimpleGrid>
    );
}

export default CalendarBody;
