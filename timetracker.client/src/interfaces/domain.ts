export interface UserModel {
    id?: string,
    name?: string,
    surname?: string,
    email?: string,
    position?: string,
    permissions?: string[],
    password?: string,
    timeload?: string,
    status?: string,
    isEmployed?: boolean,
}

export interface WorkSessionModel {
    id?: string,
    startTime?: number,
    endTime?: number,
    setBy?: string,
    userId?: string,
    editedAt?: number,
    editor?: UserModel
}

export interface WorkDayModel {
    id?: string,
    day: string,
    startTime?: number,
    endTime?: number,
    userId?: string,
}