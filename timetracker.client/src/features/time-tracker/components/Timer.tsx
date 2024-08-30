import { Box } from "@chakra-ui/react";

import { formatTime } from "@utils/formatters.ts";
import { useTimer } from "@features/time-tracker/context/timerContext.tsx";

interface TimerProps {
    color?: string;
}

function Timer({ color }: TimerProps) {
    const { time } = useTimer();

    return (
        <Box fontSize="28px" color={color}>
            {formatTime(time)}
        </Box>
    );
}

export default Timer;