import {useEffect} from "react";
import {Box} from "@chakra-ui/react";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {useDispatch} from "react-redux";
import {setTime} from "../timeTrackerSlice.ts";
import {formatTime} from "../../../utils/formatters.ts";

interface TimerProps {
    color?: string;
}

function Timer({color}: TimerProps) {
    const isTracking = useAppSelector(state => state.timeTracker.isTracking)
    const currentTime = useAppSelector(state => state.timeTracker.currentTime)

    const dispatch = useDispatch();

    useEffect(() => {
        let timerId: number;
        if (isTracking) {
            timerId = setInterval(() => {
                dispatch(setTime(currentTime + 1));
            }, 1000);
        } else dispatch(setTime(0));
        return () => clearInterval(timerId);
    }, [isTracking, currentTime, dispatch]);

    return (
        <Box fontSize="28px" color={color}>
            {formatTime(currentTime)}
        </Box>
    );
}

export default Timer;