import { createContext } from "react";
import { TimeTrackerContextType } from "@features/time-tracker/types/context.ts";

export const TimeTrackerContext = createContext<TimeTrackerContextType | null>(null);