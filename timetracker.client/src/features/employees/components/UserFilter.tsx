import { useDispatch } from "react-redux";
import { Stack, Text, useDisclosure } from "@chakra-ui/react";

import FilterDrawer from "@components/ui/FilterDrawer.tsx";
import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";

import { FilterFormProps } from "@interfaces/components.ts";
import { userStatusList } from "@constants";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useForm } from "@hooks/useForm.ts";
import { getUsers } from "@features/employees/api/actions.ts";

function UserFilter({ children }: FilterFormProps) {
    const filter = useAppSelector((state) => state.employees.filter);
    const pagination = useAppSelector(state => state.employees.pagination);
    const roles = useAppSelector(state => state.roles.roles);

    const defaultFilterData: { filterIsEmployed: string, filterStatusList: string[], filterRoleList: string[] } = {
        filterIsEmployed: "",
        filterStatusList: [],
        filterRoleList: [],
    };

    const filterData = {
        filterIsEmployed: filter?.isEmployed != null ? String(filter.isEmployed) : "",
        filterStatusList: filter?.statusList || [],
        filterRoleList: filter?.roleList || [],
    };

    const {
        data,
        setData
    } = useForm<typeof defaultFilterData, typeof filterData>(defaultFilterData, filterData);
    const { filterIsEmployed, filterStatusList, filterRoleList } = data;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    function handleRequest() {
        const paginationRequest = { page: 1, pageSize: pagination.pageSize };
        const currentPosition = filterRoleList.length ? filterRoleList : null;
        const currentStatus = filterStatusList.length ? filterStatusList : null;
        const currentIsEmployed = filterIsEmployed === "" ? null : filterIsEmployed === "true";

        const filter = {
            isEmployed: currentIsEmployed,
            roleList: currentPosition,
            statusList: currentStatus,
        };
        const isFilterEmpty = Object.values(filter).every((value) => value === null);
        dispatch(getUsers(paginationRequest, isFilterEmpty ? null : filter));
    }

    function handleCheckboxChange(array: string[], value: string, key: keyof typeof data) {
        const updatedArray = array.includes(value)
            ? array.filter((item) => item !== value)
            : [...array, value];
        setData((prevState) => ({
            ...prevState,
            [key]: updatedArray,
        }));
    }

    return (
        <FilterDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleRequest}
            onClear={() => setData(defaultFilterData)}
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
                                onChange={() => handleCheckboxChange(filterRoleList, role.id, "filterRoleList")}
                            />
                        ))}
                    </Stack>
                </Stack>

                <Stack gap="1">
                    <Text fontWeight="500">Status</Text>
                    <Stack>
                        {userStatusList.map((status) => (
                            <CustomCheckbox
                                label={status.description}
                                key={status.name}
                                isChecked={filterStatusList.includes(status.name)}
                                onChange={() => handleCheckboxChange(filterStatusList, status.name, "filterStatusList")}
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
                                setData((prevState) => ({
                                    ...prevState,
                                    filterIsEmployed: filterIsEmployed === "true" ? "" : "true",
                                }))
                            }
                        />
                        <CustomCheckbox
                            label="Terminated"
                            isChecked={filterIsEmployed === "false"}
                            onChange={() =>
                                setData((prevState) => ({
                                    ...prevState,
                                    filterIsEmployed: filterIsEmployed === "false" ? "" : "false",
                                }))
                            }
                        />
                    </Stack>
                </Stack>
            </Stack>
        </FilterDrawer>
    );
}

export default UserFilter;
