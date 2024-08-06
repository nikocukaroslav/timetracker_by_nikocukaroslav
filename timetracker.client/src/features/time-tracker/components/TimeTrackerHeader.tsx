import {Box, Button, Divider, Flex, Icon, Text} from "@chakra-ui/react";
import {PiPlayFill, PiSquareFill} from "react-icons/pi";
import Timer from "./Timer.tsx";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {setIsTracking} from "../timeTrackerSlice.ts";
import {startSession, stopSession} from "../api/actions.ts";

function TimeTrackerHeader() {
    const userId = useAppSelector(state => state.authentication.userId)
    const isTracking = useAppSelector(state => state.timeTracker.isTracking)
    const sessionId = useAppSelector(state => state.timeTracker.sessionId)

    const dispatch = useDispatch();

    function startTracking() {
        dispatch(setIsTracking(true))

        const workSession = {
            userId: userId,
            startTime: Date.now(),
        };

        dispatch(startSession(workSession));
    }

    function stopTracking() {
        dispatch(setIsTracking(false))

        const workSession = {
            id: sessionId,
            endTime: Date.now(),
        };

        dispatch(stopSession(workSession));
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
                <Timer/>
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
                            onClick={stopTracking}
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
                            onClick={startTracking}>
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

export default TimeTrackerHeader;