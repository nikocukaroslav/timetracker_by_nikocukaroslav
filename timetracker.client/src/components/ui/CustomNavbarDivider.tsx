import {Divider, Stack, Text} from "@chakra-ui/react";
import {StackProps} from "../../interfaces/components.ts";

function CustomNavbarDivider({label}: StackProps) {
    return (
        <Stack px="4" gap="3">
            <Divider py="2" borderColor="gray.600"/>
            <Text color="gray.400">{label}</Text>
        </Stack>
    );
}

export default CustomNavbarDivider;