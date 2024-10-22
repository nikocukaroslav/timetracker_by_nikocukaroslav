import { useDispatch } from "react-redux";
import { Stack, Text, useDisclosure } from "@chakra-ui/react";
import FilterDrawer from "@components/ui/FilterDrawer.tsx";
import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";
import { FilterFormProps } from "@interfaces/components.ts";
import { userStatusList } from "@constants";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { getUsers } from "@features/employees/api/actions.ts";
import { useState } from "react";

function EmployeesFilter({ children }: FilterFormProps) {
    const filter = useAppSelector((state) => state.employees.filter);
    const pagination = useAppSelector((state) => state.employees.pagination);
    const roles = useAppSelector((state) => state.roles.roles);

    const [filterIsEmployed, setFilterIsEmployed] = useState<string | null>(
        filter?.isEmployed != null ? String(filter.isEmployed) : ""
    );
    const [filterStatusList, setFilterStatusList] = useState<string[]>(filter?.statusList || []);
    const [filterRoleList, setFilterRoleList] = useState<string[]>(filter?.roleList || []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    function handleRequest() {
        const paginationRequest = { page: 1, pageSize: pagination.pageSize };
        const currentRoleList = filterRoleList.length ? filterRoleList : null;
        const currentStatusList = filterStatusList.length ? filterStatusList : null;
        const currentIsEmployed = filterIsEmployed === "" ? null : filterIsEmployed === "true";

        const filter = {
            isEmployed: currentIsEmployed,
            roleList: currentRoleList,
            statusList: currentStatusList,
        };
        const isFilterEmpty = Object.values(filter).every((value) => value === null);
        dispatch(getUsers(paginationRequest, isFilterEmpty ? null : filter));
    }

    function handleCheckboxChange(array: string[], value: string, setArray: React.Dispatch<React.SetStateAction<string[]>>) {
        const updatedArray = array.includes(value)
            ? array.filter((item) => item !== value)
            : [...array, value];
        setArray(updatedArray);
    }

    console.log(filter)
    return (
        <FilterDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleRequest}
            onClear={() => {
                setFilterIsEmployed("");
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

                <Stack gap="1">
                    <Text fontWeight="500">Employment</Text>
                    <Stack>
                        <CustomCheckbox
                            label="Employed"
                            isChecked={filterIsEmployed === "true"}
                            onChange={() =>
                                setFilterIsEmployed(filterIsEmployed === "true" ? null : "true")
                            }
                        />
                        <CustomCheckbox
                            label="Terminated"
                            isChecked={filterIsEmployed === "false"}
                            onChange={() =>
                                setFilterIsEmployed(filterIsEmployed === "false" ? null : "false")
                            }
                        />
                    </Stack>
                </Stack>
            </Stack>
        </FilterDrawer>
    );
}

export default EmployeesFilter;
