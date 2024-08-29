import { useDispatch } from "react-redux";
import { PiPlayFill, PiSquareFill } from "react-icons/pi";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";

import Timer from "./Timer.tsx";

import { setStartTracking, setStopTracking } from "../timeTrackerSlice.ts";
import { startSession, stopSession } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function TimeTrackerHeader() {
    const userId = useAppSelector(state => state.authentication.user?.id)
    const isTracking = useAppSelector(state => state.timeTracker.isTracking)
    const searchingLastSession = useAppSelector(state => state.timeTracker.searchingLastSession)
    const sessionId = useAppSelector(state => state.timeTracker.sessionId)

    const dispatch = useDispatch();

    function startTracking() {
        const startTime = Date.now();

        dispatch(setStartTracking(startTime));

        const workSession = {
            userId: userId,
            startTime,
        };

        dispatch(startSession(workSession));
    }

    function stopTracking() {
        dispatch(setStopTracking());

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
            <Timer/>
            <Button
                variant="ghost"
                display="flex"
                gap="2"
                isDisabled={searchingLastSession}
                onClick={isTracking ? stopTracking : startTracking}
            >
                <Icon
                    fill={isTracking ? "red.600" : "green.600"}
                    w="32px"
                    h="32px"
                    as={isTracking ? PiSquareFill : PiPlayFill}
                />
                <Text>{isTracking ? "Stop" : "Start"}</Text>
            </Button>
        </Flex>
    );
}

export default TimeTrackerHeader;