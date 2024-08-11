export interface UserModel {
    id?: string,
    name?: string,
    surname?: string,
    email?: string,
    position?: string,
    permissions?: string[],
    password?: string,
    timeload?: number,
    status?: string,
    isEmployed?: boolean,
}

export interface WorkSessionModel {
    id?: string,
    startTime: number,
    endTime: number,
    setBy?: string,
    userId?: string,
    editedAt?: number,
    editor?: UserModel
}