import { createContext } from "react";
import { CalendarContextType } from "@features/calendar/types/calendar.ts";

export const CalendarContext = createContext<CalendarContextType | null>(null);