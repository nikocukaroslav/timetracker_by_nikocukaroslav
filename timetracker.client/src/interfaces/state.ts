import {User} from "./actions.ts";

export interface State {
    employees: {
        loading: boolean;
        user: User;
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
}