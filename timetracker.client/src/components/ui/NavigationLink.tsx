import { NavLink } from "react-router-dom";
import { Flex, Show, Text, useBreakpointValue } from "@chakra-ui/react";

import { NavigationLinkProps } from "@interfaces/components.ts";

function NavigationLink({ icon: Icon, label, to }: NavigationLinkProps) {

    const titleValue = useBreakpointValue({ base: label, lg: "" });

    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <Flex
                    align="center"
                    gap="2"
                    py="2"
                    px="4"
                    bg={isActive ? "gray.700" : "transparent"}
                    borderRadius="md"
                    _hover={{ bg: "gray.700" }}
                    onClick={(e) => {
                        if (isActive) {
                            e.preventDefault();
                        }
                    }}
                >
                    <Icon size="28" title={titleValue}/>
                    <Show above="lg">
                        <Text>{label}</Text>
                    </Show>
                </Flex>
            )}
        </NavLink>
    );
}

export default NavigationLink;
