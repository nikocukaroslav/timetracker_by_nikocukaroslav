import { Fragment } from "react";
import { PiCalendar } from "react-icons/pi";
import { AccordionButton, AccordionItem, AccordionPanel, Divider, Flex, Stack, Text } from "@chakra-ui/react";

import WorkSession from "@features/time-tracker/components/WorkSession.tsx";

import dateFormatConverter, { formatTime } from "@utils/formatters.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";

function WorkSessionGroup({day, workSessions}: { day: string, workSessions: WorkSessionModel[] }) {
    workSessions = workSessions.filter(({endTime}) => endTime);

    const totalTime: number = workSessions.reduce((accumulator, {startTime, endTime}) => {
        return accumulator + Math.floor((endTime - startTime) / 1000);
    }, 0)

    return (
        <AccordionItem>
            <AccordionButton
                justifyContent="space-between"
                p={5}
                bg="gray.50"
                roundedTop="md"
                roundedBottom="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                _expanded={{roundedBottom: 0}}
            >
                <Flex alignItems="center" gap={2}>
                    <PiCalendar size={25}/>
                    <Text>{dateFormatConverter(day, "full-day")}</Text>
                </Flex>
                <Text w="36">{`Total: ${formatTime(totalTime)}`}</Text>
            </AccordionButton>
            <AccordionPanel
                as={Stack}
                p={0}
                bg="gray.50"
                roundedBottom="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
            >
                {workSessions.map((workSession: WorkSessionModel, i: number) => (
                    <Fragment key={workSession.id}>
                        <WorkSession data={workSession}/>
                        {i < (workSessions.length - 1) && <Divider borderBottomWidth={2}/>}
                    </Fragment>
                ))}
            </AccordionPanel>
        </AccordionItem>
    )
}

export default WorkSessionGroup;