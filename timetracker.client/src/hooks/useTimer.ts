import { useEffect, useState } from "react";

import { useAppSelector } from "@hooks/useAppSelector.ts";

export function useTimer() {
    const { isTracking, timeStart } = useAppSelector(state => state.timeTracker);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const calculateTime = () => {
            if (timeStart) {
                setTime(Math.floor((Date.now() - timeStart) / 1000));
            }
        }
        calculateTime();

        window.addEventListener("focus", calculateTime);

        return () => window.removeEventListener("focus", calculateTime)
    }, [timeStart])

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
