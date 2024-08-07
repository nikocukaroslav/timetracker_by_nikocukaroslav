import { Input } from "@chakra-ui/react";

import { InputProps } from "@interfaces/components.ts";

function CustomInput(props: InputProps) {
    return (
        <Input
            {...props}
            borderColor="gray.300"
            focusBorderColor="gray.500"
            _hover=""
        />
    );
}

export default CustomInput;
