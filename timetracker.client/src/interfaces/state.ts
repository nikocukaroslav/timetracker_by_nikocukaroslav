import { UserModel, WorkSessionModel } from "./domain.ts";

export interface EmployeesState {
    loading: boolean;
    user: UserModel;
    users: UserModel[];
}

export interface AuthenticationState {
    user: UserModel | null;
    accessToken: string | null;
    expiresAt: number | null;
    loading: boolean;
    authenticating: boolean;
    error: string | null;
}

export interface TimeTrackerState {
    workSessions: WorkSessionModel[];
    sessionId: string | null;
    isTracking: boolean;
    SearchingLastSession: boolean;
    currentTime: number;
}

export interface State {
    employees: EmployeesState
    authentication: AuthenticationState
    timeTracker: TimeTrackerState
}