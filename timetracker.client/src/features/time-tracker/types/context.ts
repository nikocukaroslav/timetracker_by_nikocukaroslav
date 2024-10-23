export type TimerContextType = {
    time: number;
    isActive: boolean;
};

export type TimeTrackerContextType = {
    userId: string;
    setUserId: (userId: string) => void;
}