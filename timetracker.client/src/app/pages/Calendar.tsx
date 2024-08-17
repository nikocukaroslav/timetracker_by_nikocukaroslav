import { useState } from "react";
import { HStack, Stack } from "@chakra-ui/react";

import CalendarHeading from "@features/calendar/components/CalendarHeading.tsx";
import CalendarControls from "@features/calendar/components/CalendarControls.tsx";
import CalendarHeader from "@features/calendar/components/CalendarHeader.tsx";
import CalendarBody from "@features/calendar/components/CalendarBody";

function Calendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    return (
        <Stack gap={0} h="full">
            <HStack gap={4} justifyContent="space-between" mb={4}>
                <CalendarHeading title="Your calendar"/>
                <CalendarControls currentDate={currentDate} setCurrentDate={setCurrentDate}/>
            </HStack>
            <CalendarHeader/>
            <CalendarBody currentDate={currentDate}/>
        </Stack>
    );
}

export default Calendar;
