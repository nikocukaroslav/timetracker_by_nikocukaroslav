import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PaginationFooter from "@components/ui/PaginationFooter.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getUsers } from "@features/employees/api/actions.ts";

function EmployeesFooter() {
    const pagination = useAppSelector(state => state.employees.pagination)
    const filter = useAppSelector(state => state.employees.filter)

    const dispatch = useDispatch()

    useEffect(() => {
        const paginationRequest = { page: pagination.page || 1, pageSize: pagination.pageSize || 10 }
        dispatch(getUsers(paginationRequest, filter));
    }, [dispatch, filter, pagination.page, pagination.pageSize]);

    function prevPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page - 1, pageSize: pagination.pageSize }
            dispatch(getUsers(paginationRequest, filter));
        }
    }

    function nextPage() {
        if (pagination.page) {
            const paginationRequest = { page: pagination.page + 1, pageSize: pagination.pageSize }
            dispatch(getUsers(paginationRequest, filter));
        }
    }

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value)
        if (newSize > 0 && newSize <= 100) {
            dispatch(getUsers({ page: 1, pageSize: newSize }, filter));
            localStorage.setItem("employeesPageSize", newSize.toString());
        }
    }

    return (
        <PaginationFooter pagination={pagination}
                          onPageSizeChange={handlePageSizeChange}
                          prevPage={prevPage}
                          nextPage={nextPage}/>
    );
}

export default EmployeesFooter;