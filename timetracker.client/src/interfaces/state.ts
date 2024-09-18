import { PaginationModel, RoleModel, UserFilterModel, UserModel, WorkSessionModel } from "./domain.ts";
import { CalendarState } from "@features/calendar/types/state.ts";

export interface EmployeesState {
    user: UserModel;
    users: UserModel[];
    pagination: PaginationModel;
    filter: UserFilterModel | null;
}

export interface ReportsState {
    reports: UserModel[];
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
    authenticating: boolean;
}

export interface TimeTrackerState {
    workSessions: WorkSessionModel[];
    sessionId: string | null;
    isTracking: boolean;
    startTime: number | null;
    pagination: PaginationModel;
}

export interface ActionsState {
    actions: Record<string, {
        fulfilled?: boolean;
        loading?: boolean;
        error?: {
            message: string;
            code: string;
        } | null;
    }>
}

export interface State {
    employees: EmployeesState;
    authentication: AuthenticationState;
    timeTracker: TimeTrackerState;
    reports: ReportsState;
    calendar: CalendarState;
    roles: RolesState;
    actionsState: ActionsState;
}