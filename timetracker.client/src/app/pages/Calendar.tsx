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
                <HStack mx={4} mb={2} justifyContent="space-between">
                    <CalendarHeading/>
                    <CalendarSearch setShowMode={setShowMode} setUserId={setUserId}/>
                    <CalendarControls/>
                </HStack>
                <CalendarHeader/>
                <CalendarBody/>
            </Stack>
        </CalendarContext.Provider>
    );
}

export default Calendar;
