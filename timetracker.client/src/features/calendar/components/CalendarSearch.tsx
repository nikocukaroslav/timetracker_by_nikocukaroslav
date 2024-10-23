import Search from "@components/ui/search/Search.tsx";
import { useContext } from "react";
import { CalendarContext } from "@features/calendar/context/calendarContext.tsx";
import { CalendarContextType } from "@features/calendar/types/calendar.ts";

function CalendarSearch() {
    const { userId, setUserId, setShowMode } = useContext(CalendarContext) as CalendarContextType;

    return (
        <Search userId={userId} setUserId={setUserId} setShowMode={setShowMode}/>
    );
}

export default CalendarSearch;
