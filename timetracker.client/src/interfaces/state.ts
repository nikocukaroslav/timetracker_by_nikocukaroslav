import { PaginationModel, RoleModel, UserFilterModel, UserModel, WorkSessionModel } from "./domain.ts";
import { CalendarState } from "@features/calendar/types/state.ts";

export interface EmployeesState {
    error: string | null;
    loading: boolean;
    user: UserModel;
    users: UserModel[];
    pagination: PaginationModel;
    filter: UserFilterModel | null;
}

export interface RolesState {
    roles: RoleModel[];
    loading: boolean;
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
    startTime: number | null;
    pagination: PaginationModel;
    loading: boolean;
    error: string | null;
}

export interface State {
    employees: EmployeesState;
    authentication: AuthenticationState;
    timeTracker: TimeTrackerState;
    calendar: CalendarState;
    roles: RolesState
}