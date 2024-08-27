import {
    Button,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Text
} from "@chakra-ui/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

import { PaginationFooterProps } from "@interfaces/components.ts";

function PaginationFooter({ pagination, onPageSizeChange, prevPage, nextPage } : PaginationFooterProps) {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            p="2"
        >
            <NumberInput maxW="100px" defaultValue={pagination.pageSize} min={1} max={100}
                         onChange={onPageSizeChange}>
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

export default PaginationFooter