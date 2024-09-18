import { createContext } from "react";
import { ReportsContextType } from "@features/reports/types/context.ts";

export const ReportsContext = createContext<ReportsContextType>(null);