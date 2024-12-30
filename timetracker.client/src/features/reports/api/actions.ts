import { GET_REPORTS } from "@constants";
import { UserFilterModel } from "@interfaces/domain.ts";

export const getReports =
    (
        pagination,
        filter: UserFilterModel | null,
        startDate,
        endDate
    ) => ({ type: GET_REPORTS, payload: { pagination, filter, startDate, endDate } })
