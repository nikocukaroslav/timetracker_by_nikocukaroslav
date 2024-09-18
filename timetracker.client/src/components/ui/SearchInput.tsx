import { Input, InputGroup, InputProps } from "@chakra-ui/react";

function SearchInput({ children, ...props }: InputProps) {
    return (
        <InputGroup maxWidth="64">
            <Input
                {...props}
                borderColor="gray.300"
                focusBorderColor="gray.500"
            />
            {children}
        </InputGroup>
    );
}

export default SearchInput;