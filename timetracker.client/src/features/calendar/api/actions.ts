import { WorkDayModel } from "@interfaces/domain.ts";
import { CREATE_WORK_DAYS, DELETE_WORK_DAYS, GET_WORK_DAYS, UPDATE_WORK_DAYS } from "@constants";

export const getWorkDays = (id: string) => ({ type: GET_WORK_DAYS, payload: id })
export const createWorkDays = (newWorkDays: {
    days: string[],
    startTime: string,
    endTime: string,
    userId: string
}) => ({ type: CREATE_WORK_DAYS, payload: newWorkDays })
export const updateWorkDay = (workDayToUpdate: WorkDayModel) => ({
    type: UPDATE_WORK_DAYS,
    payload: workDayToUpdate
})
export const deleteWorkDay = (workDayId: string) => ({ type: DELETE_WORK_DAYS, payload: workDayId })
