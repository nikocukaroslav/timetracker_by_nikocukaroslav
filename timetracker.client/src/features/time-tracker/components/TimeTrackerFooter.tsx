import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PaginationFooter from "@components/ui/PaginationFooter.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getWorkSessions } from "@features/time-tracker/api/actions.ts";
import { Box } from "@chakra-ui/react";

function TimeTrackerFooter() {
    const dispatch = useDispatch()
    const pagination = useAppSelector(state => state.timeTracker.pagination)
    const userId = useAppSelector(state => state.authentication.user?.id)

    useEffect(() => {
        const paginationRequest = { page: pagination.page || 1, pageSize: pagination.pageSize || 10 }
        dispatch(getWorkSessions(userId, paginationRequest));
    }, [dispatch]);

    function prevPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page - 1, pageSize: pagination.pageSize }
            dispatch(getWorkSessions(userId, paginationRequest));
        }
    }

    function nextPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page + 1, pageSize: pagination.pageSize }
            dispatch(getWorkSessions(userId, paginationRequest));
        }
    }

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value)
        if (newSize > 0 && newSize <= 100) {
            dispatch(getWorkSessions(userId, { page: 1, pageSize: newSize }));
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