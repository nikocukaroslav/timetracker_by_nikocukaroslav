import { UserFilterModel, UserModel, UserPaginationModel, WorkSessionModel } from "./domain.ts";
import { CalendarState } from "@features/calendar/types/state.ts";

export interface EmployeesState {
    loading: boolean;
    user: UserModel;
    users: UserModel[];
    pagination: UserPaginationModel;
    filter: UserFilterModel | null;
}

export interface AuthenticationState {
    user: UserModel | null;
    accessToken: string | null;
    expiresAt: number | null;
    loading: boolean;
    authenticating: boolean;
    error: string | null;
    isPageFound: boolean;
    createPasswordResult: boolean;
    isTemporaryLinkValid: boolean;
    resendCreatePasswordEmailStatus: string | null;
}

export interface TimeTrackerState {
    workSessions: WorkSessionModel[];
    sessionId: string | null;
    isTracking: boolean;
    searchingLastSession: boolean;
    currentTime: number;
}

export interface State {
    employees: EmployeesState;
    authentication: AuthenticationState;
    timeTracker: TimeTrackerState;
    calendar: CalendarState;
}