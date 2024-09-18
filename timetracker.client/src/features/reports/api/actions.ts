import { GET_REPORTS } from "@constants";

export const getReports =
    (
        pagination,
        startDate,
        endDate
    ) => ({ type: GET_REPORTS, payload: { pagination, startDate, endDate } })