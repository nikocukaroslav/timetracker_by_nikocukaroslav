import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AbsoluteCenter, SimpleGrid, useDisclosure } from "@chakra-ui/react";

import CalendarCell from "@features/calendar/components/CalendarCell.tsx";
import CreateEditWorkDayForm from "@features/calendar/components/CreateEditWorkDayForm.tsx";
import Spinner from "@components/ui/Spinner.tsx";

import { getCalendarBounds } from "@features/calendar/utils/getCalendarBounds.ts";
import { CalendarContext } from "@features/calendar/context/calendarContext.tsx";
import { CalendarContextType } from "@features/calendar/types/calendar.ts";
import { createWorkDays, getWorkDays } from "@features/calendar/api/actions.ts";
import { convertTime } from "@utils/formatters.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useActionState } from "@hooks/useActionState.ts";

function CalendarBody() {
    const { currentDate } = useContext(CalendarContext) as CalendarContextType;
    const { loading } = useActionState(getWorkDays);

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

    function handleCreate({ startTime, endTime, days }: { startTime: string; endTime: string, days: [] }) {
        const newWorkDays = {
            days: !days ? selectedItemsRef.current : days,
            startTime: convertTime(startTime),
            endTime: convertTime(endTime),
            userId: userId as string,
        }
        console.log(newWorkDays)
        dispatch(createWorkDays(newWorkDays))
    }

    function handleCloseForm() {
        onClose();
        selectedItemsRef.current = [];
        setSelectedItems([]);
    }

    return (
        <SimpleGrid columns={7} position="relative" w="full" h="full">
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
                    handleCreate={handleCreate}
                />;
            })}
            <CreateEditWorkDayForm
                onCreate={handleCreate}
                disclosure={{
                    ...disclosure,
                    onClose: handleCloseForm
                }}
            />
            {loading &&
                <AbsoluteCenter w="full" h="full">
                    <Spinner/>
                </AbsoluteCenter>
            }
        </SimpleGrid>
    );
}

export default CalendarBody;
