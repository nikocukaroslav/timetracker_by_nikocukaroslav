import { Dispatch, SetStateAction } from "react";

export interface ReportsContextType {
    setLoading: (value: boolean) => void;
    userId: string;
    setShowMode: Dispatch<SetStateAction<boolean>>;
    setUserId: (userId: string) => void;
    currentDate: Date;
    setCurrentDate: Dispatch<SetStateAction<Date>>;
}