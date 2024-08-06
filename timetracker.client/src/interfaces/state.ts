import {UserModel} from "./domain.ts";

export interface State {
    employees: {
        loading: boolean;
        user: UserModel;
        users: [];
    };
    authentication: {
        user: UserModel;
        accessToken: string;
        expiresAt: number;
        loading: boolean;
        error: string;
    }
    timeTracker: {
        workSessions: [];
        sessionId: string;
        isTracking: boolean;
        currentTime: number;
    }
}