import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/useAppSelector.ts";

import { useDispatch } from "react-redux";
import { setFilter } from "@features/reports/reportsSlice.ts";
import SearchInput from "@components/ui/search/SearchInput.tsx";
import { getReports } from "@features/reports/api/actions.ts";
import { ReportsContext } from "@features/reports/context/reportContext.ts";
import { ReportsContextType } from "@features/reports/types/context.ts";

function ReportsSearch() {
    const [search, setSearch] = useState("");
    const filter = useAppSelector(state => state.reports.filter);
    const pagination = useAppSelector(state => state.reports.pagination);
    const paginationRequest = { page: 1, pageSize: pagination.pageSize };

    const dispatch = useDispatch();

    const { currentDate, setLoading } = useContext(ReportsContext) as ReportsContextType;

    const date = new Date(currentDate);
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim();
        setSearch(value);
    }


    useEffect(() => {
        const searchUsers = setTimeout(async () => {
            setLoading(true);
            const updatedFilter = { ...filter, search };

            dispatch(setFilter(updatedFilter))
            dispatch(getReports(paginationRequest, updatedFilter, startDate, endDate));
        }, 300);

        setLoading(false);
        return () => clearTimeout(searchUsers);
    }, [search])

    return (
        <SearchInput
            onClick={() => setSearch("")}
            value={search}
            onChange={handleSearchChange}
            placeholder="Search employee"
        />
    );
}

export default ReportsSearch;