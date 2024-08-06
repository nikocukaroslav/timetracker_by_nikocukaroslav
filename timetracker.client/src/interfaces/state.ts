import {UserModel} from "./domain.ts";

export interface State {
    employees: {
        loading: boolean;
        user: UserModel;
        users: [];
    };
    authentication: {
        userId: string;
        loginStatus: boolean;
        expiresAt: number;
        userPermissions: string[];
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