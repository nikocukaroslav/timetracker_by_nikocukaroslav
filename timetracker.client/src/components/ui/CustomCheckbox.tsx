import { Checkbox, CheckboxProps, FormLabel, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface CustomCheckboxProps extends CheckboxProps {
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function CustomCheckbox({ label, onChange, ...props }: CustomCheckboxProps) {
    return (
        <FormLabel
            m="0"
            display="flex"
            fontWeight="normal"
            gap="2"
            alignContent="center"
        >
            <Checkbox
                onChange={onChange}
                type="checkbox"
                {...props}
                colorScheme="gray"
                borderColor="gray.300"
            />
            {label && <Text>{label}</Text>}
        </FormLabel>
    );
}

export default CustomCheckbox;
