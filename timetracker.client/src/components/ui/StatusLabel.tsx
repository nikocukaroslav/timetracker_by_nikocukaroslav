import { Flex, Icon, Text } from "@chakra-ui/react";
import { InfoLabelProps } from "@interfaces/components.ts";

function  StatusLabel({label, icon, bgColor, color}: InfoLabelProps) {
    return (
        <Flex
            position="absolute"
            alignItems="center"
            left="0"
            top="0"
            fontSize="0.625rem"
            borderColor={bgColor ? bgColor : "gray.200" }
            bg={bgColor}
            color={color}
            borderRightWidth="2px"
            borderBottomWidth="2px"
            roundedBottomRight="md"
            px="1"
            gap="1"
            zIndex="1"
        >
            {icon && (<Icon as={icon} boxSize="3.5"></Icon>)}
            <Text>{label}</Text>
        </Flex>
    );
}

export default StatusLabel