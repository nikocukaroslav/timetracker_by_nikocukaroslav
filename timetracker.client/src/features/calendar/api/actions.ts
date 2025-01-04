import {
    CREATE_WORK_DAYS,
    DELETE_WORK_DAYS,
    GET_WORK_DAYS,
    UPDATE_WORK_DAYS
} from "@features/calendar/types/actions.ts";

export const getWorkDays = (workDays: {
    startDate: string,
    endDate: string,
    userId: string
}) => ({ type: GET_WORK_DAYS, payload: workDays })
export const createWorkDays = (workDays: {
    days: string[],
    startTime: string,
    endTime: string,
    userId: string
}) => ({ type: CREATE_WORK_DAYS, payload: workDays })
export const updateWorkDay = (workDayToUpdate: {
    id: string,
    startTime: string,
    endTime: string,
}) => ({
    type: UPDATE_WORK_DAYS,
    payload: workDayToUpdate
})
export const deleteWorkDay = (workDayId: string) => ({ type: DELETE_WORK_DAYS, payload: workDayId })
