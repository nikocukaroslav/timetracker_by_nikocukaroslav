import SearchInput from "@components/ui/SearchInput.tsx";
import { InputLeftElement } from "@chakra-ui/react";
import { PiMagnifyingGlass } from "react-icons/pi";

function EmployeesSearch() {
    return (
        <SearchInput
            placeholder="Employee name"
            children={
                <InputLeftElement pointerEvents="none">
                    <PiMagnifyingGlass color="gray.300"/>
                </InputLeftElement>
            }
        />
    );
}

export default EmployeesSearch;