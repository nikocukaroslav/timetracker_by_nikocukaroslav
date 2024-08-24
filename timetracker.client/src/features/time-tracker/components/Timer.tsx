import { Box } from "@chakra-ui/react";
import { formatTime } from "@utils/formatters.ts";
import { useTimer } from "@hooks/useTimer.ts";

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