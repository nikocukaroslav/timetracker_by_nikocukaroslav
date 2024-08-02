import {Checkbox} from "@chakra-ui/react";
import {CheckboxProps} from "../../interfaces/components.ts";

function CustomCheckbox({onChange, disabled, checked, readOnly}: CheckboxProps) {
    return (
        <Checkbox readOnly={readOnly} isChecked={checked} disabled={disabled} onChange={onChange}
                  colorScheme="gray"
                  borderColor="gray.500"/>
    );
}

export default CustomCheckbox;
