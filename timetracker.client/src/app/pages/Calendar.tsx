import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from "@chakra-ui/react";

import CalendarControls from "@features/calendar/components/CalendarControls.tsx";
import CalendarHeader from "@features/calendar/components/CalendarHeader.tsx";
import CalendarBody from "@features/calendar/components/CalendarBody";
import CalendarSearch from "@features/calendar/components/CalendarSearch.tsx";
import CalendarHeading from "@features/calendar/components/CalendarHeading.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getWorkDays } from "@features/calendar/api/actions.ts";
import { getCalendarBounds } from "@features/calendar/utils/getCalendarBounds.ts";
import { convertDateToISODate } from "@utils/formatters.ts";
import { CalendarContext } from "@features/calendar/context/calendarContext.tsx";
import HomeButton from "@features/calendar/components/HomeButton.tsx";

function Calendar() {
    const accountId = useAppSelector(state => state.authentication.user?.id);
    const dispatch = useDispatch();

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [showMode, setShowMode] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>(accountId as string);

    useEffect(() => {
        const { startDate, endDate } = getCalendarBounds(currentDate.getFullYear(), currentDate.getMonth());

        const workDays = {
            startDate: convertDateToISODate(startDate),
            endDate: convertDateToISODate(endDate),
            userId
        }

        dispatch(getWorkDays(workDays));
    }, [currentDate, userId]);

    return (
        <CalendarContext.Provider value={{
            currentDate,
            setCurrentDate,
            showMode,
            setShowMode,
            userId,
            setUserId
        }}>
            <Stack gap={0} h="full">
                <HStack gap={4} justifyContent="space-between" mb={4}>
                    <CalendarControls/>
                    <CalendarHeading/>
                    <CalendarSearch/>
                </HStack>
                <CalendarHeader/>
                <CalendarBody/>
            </Stack>
            {accountId !== userId && <HomeButton onClick={() => setUserId(accountId)}/>}
        </CalendarContext.Provider>
    );
}

export default Calendar;
