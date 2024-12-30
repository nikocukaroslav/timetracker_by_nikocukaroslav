import { Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FilterFormProps } from "@interfaces/components.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import FilterDrawer from "@components/ui/FilterDrawer.tsx";
import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";
import { userStatusList } from "@constants";
import { ReportsContext } from "@features/reports/context/reportContext.ts";
import { ReportsContextType } from "@features/reports/types/context.ts";
import { getReports } from "@features/reports/api/actions.ts";


function ReportsFilter({ children }: FilterFormProps) {
    const filter = useAppSelector((state) => state.reports.filter);
    const pagination = useAppSelector((state) => state.reports.pagination);
    const roles = useAppSelector((state) => state.roles.roles);

    const [filterStatusList, setFilterStatusList] = useState<string[]>(filter?.statusList || []);
    const [filterRoleList, setFilterRoleList] = useState<string[]>(filter?.roleList || []);

    const { currentDate } = useContext(ReportsContext) as ReportsContextType;

    const date = new Date(currentDate);
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    function handleRequest() {
        const paginationRequest = { page: 1, pageSize: pagination.pageSize };
        const currentRoleList = filterRoleList.length ? filterRoleList : null;
        const currentStatusList = filterStatusList.length ? filterStatusList : null;

        const filter = {
            roleList: currentRoleList,
            statusList: currentStatusList,
        };
        const isFilterEmpty = Object.values(filter).every((value) => value === null);
        dispatch(getReports(paginationRequest, isFilterEmpty ? null : filter, startDate, endDate));
    }

    function handleCheckboxChange(array: string[], value: string, setArray: React.Dispatch<React.SetStateAction<string[]>>) {
        const updatedArray = array.includes(value)
            ? array.filter((item) => item !== value)
            : [...array, value];
        setArray(updatedArray);
    }

    return (
        <FilterDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleRequest}
            onClear={() => {
                setFilterStatusList([]);
                setFilterRoleList([]);
            }}
            triggerBtn={children}
        >
            <Stack>
                <Stack gap="1">
                    <Text fontWeight="500">Position</Text>
                    <Stack>
                        {roles.map((role) => (
                            <CustomCheckbox
                                label={role.name}
                                key={role.id}
                                isChecked={filterRoleList.includes(role.id)}
                                onChange={() => handleCheckboxChange(filterRoleList, role.id, setFilterRoleList)}
                            />
                        ))}
                    </Stack>
                </Stack>

                <Stack gap="1">
                    <Text fontWeight={450}>Status</Text>
                    <Stack>
                        {userStatusList.map((status) => (
                            <CustomCheckbox
                                label={status.description}
                                key={status.name}
                                isChecked={filterStatusList.includes(status.name)}
                                onChange={() => handleCheckboxChange(filterStatusList, status.name, setFilterStatusList)}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </FilterDrawer>
    );
}

export default ReportsFilter;