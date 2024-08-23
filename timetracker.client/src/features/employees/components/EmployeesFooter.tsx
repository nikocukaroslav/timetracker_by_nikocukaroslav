import {
    Button,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useEffect } from "react";
import { getUsers } from "@features/employees/api/actions.ts";

function EmployeesFooter() {
    const dispatch = useDispatch()
    const pagination = useAppSelector(state => state.employees.pagination)
    const filter = useAppSelector(state => state.employees.filter)

    useEffect(() => {
        const paginationRequest = { page: pagination.page || 1, pageSize: pagination.pageSize || 10 }
        dispatch(getUsers(paginationRequest, filter));
    }, [dispatch]);

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
            localStorage.setItem("pageSize", newSize.toString());
        }
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            p="2"
        >
            <NumberInput maxW="100px" defaultValue={pagination.pageSize || 10} min={1} max={100}
                         onChange={handlePageSizeChange}>
                <NumberInputField textAlign="center"/>
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>

            <Flex alignItems="center">
                <Button onClick={prevPage} isDisabled={!pagination.hasPreviousPage} variant="ghost">
                    <PiCaretLeftBold/>
                </Button>
                <Text w={12} textAlign="center">{pagination.page}/{pagination.totalPages}</Text>
                <Button onClick={nextPage} isDisabled={!pagination.hasNextPage} variant="ghost">
                    <PiCaretRightBold/>
                </Button>
            </Flex>
        </Flex>
    );
}

export default EmployeesFooter;