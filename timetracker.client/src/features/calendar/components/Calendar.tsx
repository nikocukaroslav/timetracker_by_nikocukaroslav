import { useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Button, Heading, HStack, Stack } from "@chakra-ui/react";

import CalendarHeader from "@features/calendar/components/CalendarHeader.tsx";
import CalendarBody from "@features/calendar/components/CalendarBody";
import dateFormatConverter from "@utils/formatters.ts";

function Calendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const formattedDate = dateFormatConverter(currentDate, "MMMM yyyy");

    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }

    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }

    return (
        <Stack gap={0} h="full">
            <HStack mb={4}>
                <Button onClick={prevMonth}><PiCaretLeftBold size="24"/></Button>
                <Heading size="md">{formattedDate}</Heading>
                <Button onClick={nextMonth}><PiCaretRightBold size="24"/></Button>
            </HStack>
            <CalendarHeader/>
            <CalendarBody currentDate={currentDate}/>
        </Stack>
    );
}

export default Calendar;
