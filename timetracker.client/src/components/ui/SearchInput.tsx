import { Button, Flex, Icon, Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/react";
import { PiMagnifyingGlass, PiX } from "react-icons/pi";

function SearchInput({ onClick, ...props }: InputProps) {
    return (
        <Flex gap={1} w={72}>
            <InputGroup>
                <Input
                    {...props}
                    borderColor="gray.300"
                    focusBorderColor="gray.500"
                />
                <InputLeftElement pointerEvents="none">
                    <PiMagnifyingGlass color="gray.300"/>
                </InputLeftElement>
            </InputGroup>
            {props.value !== "" &&
                <Button onClick={onClick} variant="ghost" rounded="full" p={2}><Icon as={PiX}/></Button>}
        </Flex>
    );
}

export default SearchInput;