import { useEffect, useState } from "react";

import { useAppSelector } from "@hooks/useAppSelector.ts";

export function useTimer() {
    const { isTracking, startTime } = useAppSelector(state => state.timeTracker);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const calculateTime = () => {
            if (startTime) {
                setTime(Math.floor((Date.now() - startTime) / 1000));
            }
        }
        calculateTime();

        window.addEventListener("focus", calculateTime);

        return () => window.removeEventListener("focus", calculateTime)
    }, [startTime])

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isTracking) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            setTime(0);
        }

        return () => clearInterval(timer);
    }, [isTracking]);

    return {
        time,
        isActive: isTracking
    }
}
