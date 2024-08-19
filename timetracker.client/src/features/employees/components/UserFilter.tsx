import { useDispatch } from "react-redux";
import { FormLabel, Checkbox, Stack, Text } from "@chakra-ui/react";

import FilterDrawer from "@components/ui/FilterDrawer.tsx";

import { FilterFormProps } from "@interfaces/components.ts";
import { positionList } from "@constants";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useForm } from "@hooks/useForm.ts";
import { getUsers } from "@features/employees/api/actions.ts";

function UserFilter({ children }: FilterFormProps) {
    const filter = useAppSelector((state) => state.employees.filter);
    const pagination = useAppSelector(state => state.employees.pagination);

    const defaultFilterData: { _isEmployed: string, _statusList: string[], _positionList: string[] } = {
        _isEmployed: "",
        _statusList: [],
        _positionList: [],
    };

    const filterData = {
        _isEmployed: filter?.isEmployed != null ? String(filter.isEmployed) : "",
        _statusList: filter?.statusList || [],
        _positionList: filter?.positionList || [],
    };

    const {
        data,
        isOpen,
        onOpen,
        onClose,
        setData
    } = useForm<typeof defaultFilterData, typeof filterData>(defaultFilterData, filterData);
    const { _isEmployed, _statusList, _positionList } = data;

    const dispatch = useDispatch();

    function handleRequest() {
        const paginationRequest = { page: 1, pageSize: pagination.pageSize };
        const currentPosition = _positionList.length ? _positionList : null;
        const currentStatus = _statusList.length ? _statusList : null;
        const currentIsEmployed = _isEmployed === "" ? null : _isEmployed === "true";

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
                            isChecked={_positionList.includes(pos.name)}
                            onChange={() => handleCheckboxChange(_positionList, pos.name, "_positionList")}
                        >
                            {pos.description}
                        </Checkbox>
                    ))}
                </Stack>
            </FormLabel>

            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Status</Text>
                <Stack direction="column">
                    <Checkbox
                        colorScheme="gray"
                        isChecked={_statusList.includes("EMPLOYED")}
                        onChange={() => handleCheckboxChange(_statusList, "EMPLOYED", "_statusList")}
                    >
                        Employed
                    </Checkbox>
                </Stack>
            </FormLabel>

            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Employment</Text>
                <Stack direction="column">
                    <Checkbox
                        colorScheme="gray"
                        isChecked={_isEmployed === "true"}
                        onChange={() =>
                            setData((prevState) => ({
                                ...prevState,
                                _isEmployed: _isEmployed === "true" ? "" : "true",
                            }))
                        }
                    >
                        Employed
                    </Checkbox>
                    <Checkbox
                        colorScheme="gray"
                        isChecked={_isEmployed === "false"}
                        onChange={() =>
                            setData((prevState) => ({
                                ...prevState,
                                _isEmployed: _isEmployed === "false" ? "" : "false",
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
