import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from "@chakra-ui/react";

import CalendarHeading from "@features/calendar/components/CalendarHeading.tsx";
import CalendarControls from "@features/calendar/components/CalendarControls.tsx";
import CalendarHeader from "@features/calendar/components/CalendarHeader.tsx";
import CalendarBody from "@features/calendar/components/CalendarBody";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getWorkDays } from "@features/calendar/api/actions.ts";
import { getCalendarBounds } from "@features/calendar/utils/getCalendarBounds.ts";
import { convertDateToISODate } from "@utils/formatters.ts";

function Calendar() {
    const userId = useAppSelector(state => state.authentication.user?.id);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const dispatch = useDispatch();

    useEffect(() => {
        const { startDate, endDate } = getCalendarBounds(currentDate.getFullYear(), currentDate.getMonth());

        const workDays = {
            startDate: convertDateToISODate(startDate),
            endDate: convertDateToISODate(endDate),
            userId: userId as string
        }

        dispatch(getWorkDays(workDays));
    }, [currentDate])

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
