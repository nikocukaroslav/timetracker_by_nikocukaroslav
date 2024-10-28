import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import PaginationFooter from "@components/ui/PaginationFooter.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getReports } from "@features/time-tracker/api/actions.ts";
import { Box } from "@chakra-ui/react";
import { TimeTrackerContext } from "@features/time-tracker/context/timeTrackerContext.ts";
import { TimeTrackerContextType } from "@features/time-tracker/types/context.ts";

function TimeTrackerFooter() {
    const dispatch = useDispatch()
    const pagination = useAppSelector(state => state.timeTracker.pagination)
    const { userId } = useContext(TimeTrackerContext) as TimeTrackerContextType;

    useEffect(() => {
        const paginationRequest = { page: pagination.page || 1, pageSize: pagination.pageSize || 10 }
        dispatch(getReports(userId, paginationRequest));
    }, [dispatch, userId]);

    function prevPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page - 1, pageSize: pagination.pageSize }
            dispatch(getReports(userId, paginationRequest));
        }
    }

    function nextPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page + 1, pageSize: pagination.pageSize }
            dispatch(getReports(userId, paginationRequest));
        }
    }

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value)
        if (newSize > 0 && newSize <= 100) {
            dispatch(getReports(userId, { page: 1, pageSize: newSize }));
            localStorage.setItem("trackerPageSize", newSize.toString());
        }
    }

    return (
        <Box
            bg="gray.50"
            rounded="md"
            boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)">
            <PaginationFooter
                pagination={pagination}
                onPageSizeChange={handlePageSizeChange}
                prevPage={prevPage}
                nextPage={nextPage}/>
        </Box>
    );
}

export default TimeTrackerFooter;