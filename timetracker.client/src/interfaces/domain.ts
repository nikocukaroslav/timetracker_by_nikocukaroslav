export interface UserModel {
    id?: string,
    name?: string,
    surname?: string,
    email?: string,
    position?: string,
    permissions?: string[],
    password?: string,
    timeload?: number,
}

export interface WorkSessionModel {
    id?: string,
    startTime: number,
    endTime: number,
    userId: string,
}