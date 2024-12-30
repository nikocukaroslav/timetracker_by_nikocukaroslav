import { Dispatch, SetStateAction } from "react";

export type CalendarContextType = {
    currentDate: Date;
    setCurrentDate: Dispatch<SetStateAction<Date>>;
    showMode: boolean;
    userId: string;
    setShowMode: Dispatch<SetStateAction<boolean>>;
    setUserId: (userId: string) => void;
};