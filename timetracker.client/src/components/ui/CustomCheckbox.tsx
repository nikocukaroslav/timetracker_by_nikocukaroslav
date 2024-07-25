import {Checkbox} from "@chakra-ui/react";
import {ChangeEvent, MouseEventHandler} from "react";

interface CheckboxProps {
    onClick?: MouseEventHandler<HTMLInputElement>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CustomCheckbox({onClick, onChange}: CheckboxProps) {
    return (
        <Checkbox onChange={onChange} onClick={onClick} colorScheme="gray" borderColor="gray.500"/>

    );
}

export default CustomCheckbox;
