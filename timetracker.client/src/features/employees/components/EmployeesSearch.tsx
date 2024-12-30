import SearchInput from "@components/ui/search/SearchInput.tsx";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EmployeesContext } from "@features/employees/context/employeesContext.ts";
import { EmployeesContextType } from "@features/employees/types/employees.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getUsers } from "@features/employees/api/actions.ts";
import { setFilter } from "@features/employees/employeesSlice.ts";

function EmployeesSearch() {
    const [search, setSearch] = useState("");
    const filter = useAppSelector(state => state.employees.filter);
    const pagination = useAppSelector(state => state.employees.pagination);
    const paginationRequest = { page: 1, pageSize: pagination.pageSize };

    const { setLoading } = useContext(EmployeesContext) as EmployeesContextType;

    const dispatch = useDispatch();

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim();
        setSearch(value);
    }

    useEffect(() => {
        const searchUsers = setTimeout(async () => {
            setLoading(true);
            const updatedFilter = { ...filter, search };

            dispatch(setFilter(updatedFilter))
            dispatch(getUsers(paginationRequest, updatedFilter));
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

export default EmployeesSearch;