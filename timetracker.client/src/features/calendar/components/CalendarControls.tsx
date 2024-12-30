import { useContext } from "react";
import { CalendarContext } from "@features/calendar/context/calendarContext.tsx";
import { CalendarContextType } from "@features/calendar/types/calendar.ts";
import Controls from "@components/ui/Controls.tsx";

function CalendarControls() {
    const { currentDate, setCurrentDate } = useContext(CalendarContext) as CalendarContextType;

    return (
        <Controls currentDate={currentDate} setCurrentDate={setCurrentDate}/>
    );
}

export default CalendarControls;
