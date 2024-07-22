import {Input} from "@chakra-ui/react";

interface InputProps {
    type: string,
    required?: boolean,
}

function MyInput({type, required}: InputProps) {
    return (
        <Input type={type} required={required} borderColor="gray.300" focusBorderColor="gray.500"
               _hover=""/>
    );
}

export default MyInput;