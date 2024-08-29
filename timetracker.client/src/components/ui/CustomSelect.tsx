import { ErrorMessage, Field, useField } from 'formik';
import { Box, Flex, FormLabel, Icon, InputProps, Select, Text } from '@chakra-ui/react';
import { IconType } from "react-icons";

interface CustomSelectProps extends InputProps {
    label?: string;
    name: string;
    icon?: IconType;
    error?: string;
    touched?: boolean;
    options: { name: string; description: string }[];
}

const CustomSelect = ({ label, name, icon, options, onChange, ...props }: CustomSelectProps) => {
    const [field, meta] = useField(name);
    const isError = meta.touched && meta.error;

    return (
        <FormLabel display="flex" flexDirection="column" gap="1">
            <Flex gap="2">
                {icon && <Icon as={icon} w="24px" h="24px"/>}
                {label && <Text>{label}</Text>}
            </Flex>
            <Field
                as={Select}
                variant="outline"
                borderColor={isError ? "red.300" : "gray.300"}
                focusBorderColor={isError ? "red.300" : "gray.500"}
                {...field} {...props}
                onChange={(e) => {
                    field.onChange(e)
                    onChange && onChange(e)
                }}>
                {options.map(option => (
                    <option key={option.name} value={option.name}>
                        {option.description}
                    </option>
                ))}
            </Field>
            <ErrorMessage
                name={name}
                render={(errorMessage) => (
                    <Box color="red.500" h={1} mt="-1" fontSize="sm" fontWeight="normal">
                        {errorMessage}
                    </Box>
                )}
            />
        </FormLabel>
    );
};

export default CustomSelect;
