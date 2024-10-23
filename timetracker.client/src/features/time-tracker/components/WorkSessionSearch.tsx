import { useContext } from "react";
import { TimeTrackerContext } from "@features/time-tracker/context/timeTrackerContext.ts";
import { TimeTrackerContextType } from "@features/time-tracker/types/context.ts";
import Search from "@components/ui/search/Search.tsx";

function WorkSessionSearch() {
    const { setUserId, userId } = useContext(TimeTrackerContext) as TimeTrackerContextType;

    return (
        <Search setUserId={setUserId} userId={userId}/>
    );
}

export default WorkSessionSearch;