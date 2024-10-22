import { useDispatch } from "react-redux";
import { PiPlayFill, PiSquareFill } from "react-icons/pi";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";

import Timer from "./Timer.tsx";

import { setStartTracking, setStopTracking } from "../timeTrackerSlice.ts";
import { getLastWorkSession, startSession, stopSession } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useActionState } from "@hooks/useActionState.ts";

function TimeTrackerHeader() {
    const userId = useAppSelector(state => state.authentication.user?.id) as string;
    const isTracking = useAppSelector(state => state.timeTracker.isTracking);
    const sessionId = useAppSelector(state => state.timeTracker.sessionId);

    const { loading } = useActionState(getLastWorkSession);
    const dispatch = useDispatch();

    function startTracking() {
        const startTime = Date.now();

        dispatch(setStartTracking(startTime));

        const workSession = {
            userId,
            startTime,
        };

        dispatch(startSession(workSession));
    }

    function stopTracking() {
        dispatch(setStopTracking());

        const workSession = {
            id: sessionId as string,
            endTime: Date.now(),
        };

        dispatch(stopSession(workSession));
    }

    return (
        <Flex
            p="4"
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
                isDisabled={loading}
                onClick={isTracking ? stopTracking : startTracking}
            >
                <Icon
                    fill={isTracking ? "red.600" : "green.600"}
                    w="28px"
                    h="28px"
                    as={isTracking ? PiSquareFill : PiPlayFill}
                />
                <Text>{isTracking ? "Stop" : "Start"}</Text>
            </Button>
        </Flex>
    );
}

export default TimeTrackerHeader;