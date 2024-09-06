import { WorkDayModel } from "@interfaces/domain.ts";

export interface CalendarState {
    workDays: WorkDayModel[];
    user: {
        id: string,
        name: string,
        surname: string
    } | null,
}