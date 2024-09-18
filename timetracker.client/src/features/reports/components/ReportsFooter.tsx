import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import PaginationFooter from "@components/ui/PaginationFooter.tsx";
import { getReports } from "@features/reports/api/actions.ts";
import { ReportsContext } from "@features/reports/context/reportContext.ts";

function ReportsFooter() {
    const dispatch = useDispatch()
    const pagination = useAppSelector(state => state.reports.pagination)

    const { currentDate } = useContext(ReportsContext);

    const date = new Date(currentDate);

    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

    useEffect(() => {
        const paginationRequest = { page: pagination.page || 1, pageSize: pagination.pageSize || 10 }
        dispatch(getReports(paginationRequest, startDate, endDate));
    }, [dispatch, endDate, pagination.page, pagination.pageSize, startDate]);

    function prevPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page - 1, pageSize: pagination.pageSize }
            dispatch(getReports(paginationRequest, startDate, endDate));
        }
    }

    function nextPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page + 1, pageSize: pagination.pageSize }
            dispatch(getReports(paginationRequest, startDate, endDate));
        }
    }

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value)
        if (newSize > 0 && newSize <= 100) {
            dispatch(getReports({ page: 1, pageSize: newSize }, startDate, endDate));
            localStorage.setItem("reportsPageSize", newSize.toString());
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

export default ReportsFooter;