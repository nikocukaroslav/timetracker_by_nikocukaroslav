import { Input } from "@chakra-ui/react";

import { InputProps } from "@interfaces/components.ts";

function CustomInput({type, required, onChange, value, readOnly}: InputProps) {
    return (
        <Input
            readOnly={readOnly}
            type={type}
            required={required}
            onChange={onChange}
            value={value}
            borderColor="gray.300"
            focusBorderColor="gray.500"
            _hover=""
        />
    );
}

export default CustomInput;
