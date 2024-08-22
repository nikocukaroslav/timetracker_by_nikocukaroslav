import { useDispatch } from "react-redux";
import { FormLabel, Checkbox, Stack, Text } from "@chakra-ui/react";

import FilterDrawer from "@components/ui/FilterDrawer.tsx";

import { FilterFormProps } from "@interfaces/components.ts";
import { positionList, userStatusList } from "@constants";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useForm } from "@hooks/useForm.ts";
import { getUsers } from "@features/employees/api/actions.ts";

function UserFilter({ children }: FilterFormProps) {
    const filter = useAppSelector((state) => state.employees.filter);
    const pagination = useAppSelector(state => state.employees.pagination);

    const defaultFilterData: { filterIsEmployed: string, filterStatusList: string[], filterPositionList: string[] } = {
        filterIsEmployed: "",
        filterStatusList: [],
        filterPositionList: [],
    };

    const filterData = {
        filterIsEmployed: filter?.isEmployed != null ? String(filter.isEmployed) : "",
        filterStatusList: filter?.statusList || [],
        filterPositionList: filter?.positionList || [],
    };

    const {
        data,
        isOpen,
        onOpen,
        onClose,
        setData
    } = useForm<typeof defaultFilterData, typeof filterData>(defaultFilterData, filterData);
    const { filterIsEmployed, filterStatusList, filterPositionList } = data;

    const dispatch = useDispatch();

    function handleRequest() {
        const paginationRequest = { page: 1, pageSize: pagination.pageSize };
        const currentPosition = filterPositionList.length ? filterPositionList : null;
        const currentStatus = filterStatusList.length ? filterStatusList : null;
        const currentIsEmployed = filterIsEmployed === "" ? null : filterIsEmployed === "true";

        const filter = {
            isEmployed: currentIsEmployed,
            positionList: currentPosition,
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
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Position</Text>
                <Stack direction="column">
                    {positionList.map((pos) => (
                        <Checkbox
                            colorScheme="gray"
                            key={pos.name}
                            isChecked={filterPositionList.includes(pos.name)}
                            onChange={() => handleCheckboxChange(filterPositionList, pos.name, "filterPositionList")}
                        >
                            {pos.description}
                        </Checkbox>
                    ))}
                </Stack>
            </FormLabel>

            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Status</Text>
                <Stack direction="column">
                    {userStatusList.map((status) => (
                        <Checkbox
                            colorScheme="gray"
                            key={status.name}
                            isChecked={filterStatusList.includes(status.name)}
                            onChange={() => handleCheckboxChange(filterStatusList, status.name, "filterStatusList")}
                        >
                            {status.description}
                        </Checkbox>
                    ))}
                </Stack>
            </FormLabel>

            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Employment</Text>
                <Stack direction="column">
                    <Checkbox
                        colorScheme="gray"
                        isChecked={filterIsEmployed === "true"}
                        onChange={() =>
                            setData((prevState) => ({
                                ...prevState,
                                filterIsEmployed: filterIsEmployed === "true" ? "" : "true",
                            }))
                        }
                    >
                        Employed
                    </Checkbox>
                    <Checkbox
                        colorScheme="gray"
                        isChecked={filterIsEmployed === "false"}
                        onChange={() =>
                            setData((prevState) => ({
                                ...prevState,
                                filterIsEmployed: filterIsEmployed === "false" ? "" : "false",
                            }))
                        }
                    >
                        Terminated
                    </Checkbox>
                </Stack>
            </FormLabel>
        </FilterDrawer>
    );
}

export default UserFilter;
