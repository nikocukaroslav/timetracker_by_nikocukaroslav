import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PiCaretLeftBold, PiCaretRightBold, PiFunnel, PiPlus } from "react-icons/pi";
import {
    Button,
    Divider,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Text
} from "@chakra-ui/react";

import CreateEditMemberForm from "@features/employees/components/CreateEditMemberForm.tsx";
import EmployeesList from "@features/employees/components/EmployeesList.tsx";
import UserFilter from "@features/employees/components/UserFilter.tsx";

import { getUsers } from "@features/employees/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function Employees() {
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
        <>
            <Flex
                bg="gray.50"
                flexDirection="column"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                overflow="hidden"
                height="full"
            >
                <Flex
                    justify="space-between"
                    align="center"
                    p="5"
                >
                    <Text fontSize="2xl">Company ({pagination.totalCount} members{filter ? " founded" : ""})</Text>
                    <Flex alignItems="flex-start">
                        <UserFilter>
                            <Button leftIcon={<PiFunnel/>} variant="ghost">Filter</Button>
                        </UserFilter>
                        <CreateEditMemberForm>
                            <Button leftIcon={<PiPlus/>} variant="ghost">Add member</Button>
                        </CreateEditMemberForm>
                    </Flex>
                </Flex>
                <Divider borderColor="gray.300" borderWidth="1px"/>
                <EmployeesList/>
                <Spacer/>
                <Divider borderColor="gray.300" borderWidth="1px"/>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    p="3"
                >
                    <NumberInput maxW="100px" defaultValue={pagination.pageSize || 10} min={1} max={100} onChange={handlePageSizeChange}>
                        <NumberInputField textAlign="center"/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>

                    <Flex alignItems="center">
                        <Button onClick={prevPage} isDisabled={!pagination.hasPreviousPage} variant="ghost">
                            <PiCaretLeftBold size="24"/>
                        </Button>
                        <Text w={20} fontSize="2xl" textAlign="center">{pagination.page}/{pagination.totalPages}</Text>
                        <Button onClick={nextPage} isDisabled={!pagination.hasNextPage} variant="ghost">
                            <PiCaretRightBold size="24"/>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export default Employees;
