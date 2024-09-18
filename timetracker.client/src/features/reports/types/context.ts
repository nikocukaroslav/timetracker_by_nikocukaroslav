import { Dispatch, SetStateAction } from "react";

export interface ReportsContextType {
    currentDate: Date;
    setCurrentDate: Dispatch<SetStateAction<Date>>;
}