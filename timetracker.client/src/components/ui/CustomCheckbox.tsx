import {Checkbox} from "@chakra-ui/react";
import {CheckboxProps} from "../../interfaces/components.ts";

function CustomCheckbox({onClick, onChange, disabled, checked, readOnly}: CheckboxProps) {
    return (
        <Checkbox readOnly={readOnly} isChecked={checked} disabled={disabled} onChange={onChange}
                  onClick={onClick}
                  colorScheme="gray"
                  borderColor="gray.500"/>
    );
}

export default CustomCheckbox;
