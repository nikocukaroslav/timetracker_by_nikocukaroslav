import { Dispatch, SetStateAction } from "react";

export type CalendarContextType = {
    currentDate: Date;
    setCurrentDate: Dispatch<SetStateAction<Date>>;
    showMode: boolean;
    setShowMode: Dispatch<SetStateAction<boolean>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
};