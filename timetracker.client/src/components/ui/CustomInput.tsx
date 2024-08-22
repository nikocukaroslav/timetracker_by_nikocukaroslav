import { Input, InputProps } from "@chakra-ui/react";

function CustomInput(props: InputProps) {
    return (
        <Input
            {...props}
            borderColor="gray.300"
            focusBorderColor="gray.500"
        />
    );
}

export default CustomInput;
