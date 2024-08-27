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

export interface PaginationModel {
    totalCount?: number,
    pageSize?: number,
    page?: number,
    hasNextPage?: boolean,
    hasPreviousPage?: boolean,
    totalPages?: number,
}

export interface UserFilterModel {
    isEmployed?: boolean | null,
    statusList?: string[] | null,
    positionList?: string[] | null,
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
    startTime?: string,
    endTime?: string,
    userId?: string,
}