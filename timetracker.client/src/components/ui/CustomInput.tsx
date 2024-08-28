import { Box, Flex, FormLabel, Icon, Input, InputGroup, InputProps, Text } from "@chakra-ui/react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { IconType } from "react-icons";

interface CustomInputProps extends InputProps {
    label?: string;
    name: string;
    icon?: IconType;
    error?: string;
    touched?: boolean;
}

function CustomInput({ label, name, icon, children, ...props }: CustomInputProps) {
    const { errors, touched } = useFormikContext();
    const isError: boolean = errors[name] && touched[name];

    return (
        <FormLabel display="flex" flexDirection="column" gap="1">
            <Flex gap="2">
                {icon && <Icon as={icon} w="24px" h="24px"/>}
                {label && <Text>{label}</Text>}
            </Flex>
            <InputGroup>
                <Field
                    as={Input}
                    name={name}
                    {...props}
                    borderColor={isError ? "red.300" : "gray.300"}
                    focusBorderColor={isError ? "red.300" : "gray.500"}
                />
                {children}
            </InputGroup>
            <ErrorMessage
                name={name}
                render={(errorMessage) => <Box color="red.500" h={1} mt="-1" fontSize="sm">{errorMessage}</Box>}/>
        </FormLabel>
    );
}

export default CustomInput;
