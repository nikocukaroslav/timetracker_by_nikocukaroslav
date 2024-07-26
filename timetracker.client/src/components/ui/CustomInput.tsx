import {Input} from "@chakra-ui/react";
import {ChangeEventHandler} from "react";

interface InputProps {
    type: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string;
}

function CustomInput({type, required, onChange, value}: InputProps) {
    return (
        <Input
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
