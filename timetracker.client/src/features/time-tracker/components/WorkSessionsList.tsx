import { PiPlus } from "react-icons/pi";
import { Accordion, Flex, Icon, Stack, } from "@chakra-ui/react";

import WorkSessionGroup from "@features/time-tracker/components/WorkSessionGroup.tsx";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import dateFormatConverter from "@utils/formatters.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";

function WorkSessionsList() {
    const workSessions = useAppSelector(state => state.timeTracker.workSessions);
    const workSessionsData: WorkSessionModel[] = JSON.parse(JSON.stringify(workSessions));
    
    const workSessionsSorted = workSessionsData.sort((a, b) => b.startTime - a.startTime);
    const workSessionGroups = Object.groupBy(workSessionsSorted, ({startTime}: {
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
            <CreateEditWorkSessionForm>
                <Flex
                    title="Add session"
                    position="absolute"
                    bottom={4}
                    right={4}
                    p={4}
                    rounded="full"
                    bg="gray.50"
                    boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                    transition="all 0.2s"
                    cursor="pointer"
                    _hover={{bg: "blackAlpha.50"}}
                >
                    <Icon as={PiPlus} boxSize={8}/>
                </Flex>
            </CreateEditWorkSessionForm>
        </Accordion>
    )
}

export default WorkSessionsList;