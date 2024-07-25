import {Box, Button, Divider, Flex, Icon, List, ListItem, Text} from "@chakra-ui/react";
import {PiPauseFill, PiPlayFill, PiSquareFill, PiTimer} from "react-icons/pi";
import {useEffect, useState} from "react";
import {calculateTotalTime} from "../../utils/calculateTotalTime.ts";
import {formatDate, formatTime, formatTrackerTime} from "../../utils/formatters.ts";

const workDays = [
    {
        id: "guid",
        startTime: new Date(321).toISOString(),
        endTime: new Date(124141234).toISOString(),
        userId: "guid",
    },
]

function TimeTracker() {
    const [isTracking, setIsTracking] = useState(false);
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState("");


    useEffect(() => {
        let timerId: number;
        if (isTracking) {
            timerId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [isTracking, time]);


    function handleTracking() {
        setStartTime(startTime || new Date().toISOString());
        setIsTracking(!isTracking);
    }

    function handleSubmit() {
        const endTime = new Date().toISOString();

        setIsTracking(false);

        const workDay = {
            startTime: startTime,
            endTime: endTime,
        }

        workDays.push(workDay)
        setTime(0);
        setStartTime("");
    }

    return (
        <Flex m="3" direction="column" gap="4">
            <Flex
                p="5"
                bg="gray.50"
                justify="space-between"
                align="center"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
            >
                <Text fontSize="2xl">Start time tracking</Text>
                <Flex align="center" gap="5">
                    <Box fontSize="28px" w="32">
                        {formatTrackerTime(time)}
                    </Box>
                    <Divider orientation="vertical" h="32px" borderColor="gray.500"/>
                    <Flex gap="1">
                        <Button variant="ghost" size="xl" p="2" minWidth="120px" onClick={handleTracking}>
                            {
                                isTracking ?
                                    <Flex align="center" gap="2">
                                        <Icon fill="gray.700" w="32px" h="32px" as={PiPauseFill}/>
                                        <Text>Pause</Text>
                                    </Flex>
                                    :
                                    <Flex align="center" gap="2">
                                        <Icon fill="green.600" w="32px" h="32px" as={PiPlayFill}/>
                                        <Text>Start</Text>
                                    </Flex>
                            }
                        </Button>
                        {(isTracking || time > 0) &&
                            <Button variant="ghost" size="xl" p="2" display="flex" gap="2" onClick={handleSubmit}>
                                <Icon fill="red.600" w="32px" h="32px" as={PiSquareFill}/>
                                <Text>Stop</Text>
                            </Button>
                        }
                    </Flex>
                </Flex>
            </Flex>
            <List display="flex" flexDirection="column" gap="3">
                {workDays.map(workDay => {
                    return (
                        <ListItem key={workDay.id}>
                            <Text color="gray.500" fontSize="sm" mb="1">{formatDate(new Date(workDay.startTime))}</Text>
                            <Flex
                                p="5"
                                bg="gray.50"
                                align="center"
                                rounded="md"
                                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                                justify="space-between"
                            >
                                <Flex gap="12" align="center">
                                    <Flex gap="2" align="center">
                                        <PiTimer size="28"/>
                                        <Text>Working
                                            time: {formatTime(new Date(workDay.startTime))}-{formatTime(new Date(workDay.endTime))}
                                        </Text>
                                    </Flex>
                                    <Divider orientation="vertical" h="32px" borderColor="gray.500"/>
                                    <Text>Total: {calculateTotalTime(new Date(workDay.startTime), new Date(workDay.endTime))}</Text>
                                </Flex>
                                <Button variant="ghost">Continue</Button>
                            </Flex>
                        </ListItem>
                    )
                })}
            </List>
        </Flex>
    );
}

export default TimeTracker;
