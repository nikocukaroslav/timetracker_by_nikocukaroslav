import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useInterval } from "@chakra-ui/react";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { TimerContextType } from "@features/time-tracker/types/context.ts";
import { getLastWorkSession } from "@features/time-tracker/api/actions.ts";

const defaultValue = {
    time: 0,
    isActive: false
};

const TimerContext = createContext<TimerContextType>(defaultValue);

export default function TimerProvider({ children }: { children: ReactNode }) {
    const userId = useAppSelector(state => state.authentication.user?.id);
    const { isTracking, startTime } = useAppSelector(state => state.timeTracker);

    const [time, setTime] = useState(0);
    const dispatch = useDispatch();

    const providerValue = {
        time,
        isActive: isTracking
    };

    useEffect(() => {
        dispatch(getLastWorkSession(userId))
    }, [userId]);

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
        if (!isTracking) {
            setTime(0);
        }
    }, [isTracking])

    useInterval(() => {
        setTime(time + 1);
    }, isTracking ? 1000 : null);

    return (
        <TimerContext.Provider value={providerValue}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    return useContext(TimerContext);
}
