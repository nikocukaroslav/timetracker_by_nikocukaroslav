import {Checkbox} from "@chakra-ui/react";
import {ChangeEvent, MouseEventHandler} from "react";

interface CheckboxProps {
    onClick?: MouseEventHandler<HTMLInputElement>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    checked?: boolean;
    readOnly?: boolean;
}

function CustomCheckbox({onClick, onChange, disabled, checked, readOnly}: CheckboxProps) {
    return (
        <Checkbox readOnly={readOnly} isChecked={checked} disabled={disabled} onChange={onChange} onClick={onClick}
                  colorScheme="gray"
                  borderColor="gray.500"/>

    );
}

export default CustomCheckbox;
