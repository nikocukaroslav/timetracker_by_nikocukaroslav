import { List } from "@chakra-ui/react";

import WorkSession from "./WorkSession.tsx";

import { WorkSessionModel } from "@interfaces/domain.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function WorkSessionsList() {
    const workSessions = useAppSelector(state => state.timeTracker.workSessions)

    return (
        <List display="flex" flexDirection="column" gap="3" overflow="auto">
            {workSessions.filter((workSession: WorkSessionModel) => workSession.endTime !== null)
                .map((workSession: WorkSessionModel) => {
                    return (
                        <WorkSession key={workSession.id} workSession={workSession}/>
                    );
                })}
        </List>
    );
}

export default WorkSessionsList;