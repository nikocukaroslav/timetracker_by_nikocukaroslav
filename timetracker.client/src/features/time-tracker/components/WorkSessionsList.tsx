import { Accordion, Stack, } from "@chakra-ui/react";

import WorkSessionGroup from "@features/time-tracker/components/WorkSessionGroup.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import dateFormatConverter from "@utils/formatters.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";

function WorkSessionsList() {
    const workSessions = useAppSelector(state => state.timeTracker.workSessions)

    const workSessionGroups = Object.groupBy(workSessions, ({startTime}: {
        startTime: number
    }) => dateFormatConverter(startTime));
    const daysGroup: [string, WorkSessionModel[]][] = Object.entries(workSessionGroups);

    return (
        <Accordion as={Stack} allowMultiple reduceMotion sx={{
            ".chakra-collapse": {
                overflow: "initial !important"
            }
        }}>
            {daysGroup.map(([day, sessions]) => {
                return <WorkSessionGroup key={day} day={day} workSessions={sessions}/>
            })}
        </Accordion>
    )
}

export default WorkSessionsList;