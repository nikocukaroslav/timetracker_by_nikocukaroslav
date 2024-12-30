import { useContext } from "react";
import { ReportsContext } from "@features/reports/context/reportContext.ts";

import Controls from "@components/ui/Controls.tsx";
import { ReportsContextType } from "@features/reports/types/context.ts";

function ReportsControls() {
    const { currentDate, setCurrentDate } = useContext(ReportsContext) as ReportsContextType;

    return (
        <Controls currentDate={currentDate} setCurrentDate={setCurrentDate}/>
    );
}

export default ReportsControls;