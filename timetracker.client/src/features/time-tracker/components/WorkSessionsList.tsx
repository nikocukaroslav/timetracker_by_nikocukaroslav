import { Accordion, Stack, } from "@chakra-ui/react";

import WorkSessionGroup from "@features/time-tracker/components/WorkSessionGroup.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import dateConverter from "@utils/formatters.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";

function WorkSessionsList() {
    const workSessions = useAppSelector(state => state.timeTracker.workSessions);

    const completedWorkSessions: WorkSessionModel[] = workSessions.filter(({ endTime }) => endTime);
    const sortedWorkSessions = completedWorkSessions.sort((a, b) => b.startTime - a.startTime);
    const workSessionGroups = Object.groupBy(sortedWorkSessions, ({ startTime }: {
        startTime: number
    }) => dateConverter(startTime));

    const daysGroup: [string, WorkSessionModel[]][] = Object.entries(workSessionGroups);

    return (
        <Accordion as={Stack} allowMultiple reduceMotion>
            {daysGroup.map(([day, sessions]) =>
                <WorkSessionGroup key={day} day={day} workSessions={sessions}/>
            )}
        </Accordion>
    )
}

export default WorkSessionsList;