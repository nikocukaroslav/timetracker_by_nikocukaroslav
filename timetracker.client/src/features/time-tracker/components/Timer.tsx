import {Box, Button, Divider, Flex, Icon, Text} from "@chakra-ui/react";
import {formatTrackerTime} from "../../../utils/formatters.ts";
import {PiPlayFill, PiSquareFill} from "react-icons/pi";
import {useEffect, useState} from "react";

export const workSessions = [
    {
        id: "guid",
        startTime: new Date(321),
        endTime: new Date(124141234),
        setBy: "manually || system",
        edited: false,
        editedBy: "guid",
        editedAt: new Date(123123123),
        userId: "guid",
    },
];

function Timer() {
    const [isTracking, setIsTracking] = useState(false);
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        let timerId: number;
        if (isTracking) {
            timerId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [isTracking, time]);

    function handleTracking() {
        setStartTime(Date.now());
        setIsTracking(true);
    }

    function handleSubmit() {
        const endTime = Date.now();

        setIsTracking(false);

        const workSession = {
            id: "guid",
            startTime: startTime,
            endTime: endTime,
            setBy: "manually || system",
            edited: false,
            editedBy: "guid",
            editedAt: new Date(123123123),
            userId: "guid",
        };

        workSessions.push(workSession);
        setTime(0);
        console.log(workSession)
    }


    return (
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
                <Divider
                    orientation="vertical"
                    h="32px"
                    borderColor="gray.500"
                />
                <Box minWidth="120px">
                    {isTracking ? (
                        <Button
                            variant="ghost"
                            display="flex"
                            gap="2"
                            onClick={handleSubmit}
                        >
                            <Icon
                                fill="red.600"
                                w="32px"
                                h="32px"
                                as={PiSquareFill}
                            />
                            <Text>Stop</Text>
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            display="flex"
                            gap="2"
                            onClick={handleTracking}>
                            <Icon
                                fill="green.600"
                                w="32px"
                                h="32px"
                                as={PiPlayFill}
                            />
                            <Text>Start</Text>
                        </Button>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}

export default Timer;