import {NavLink} from "react-router-dom";
import {Flex, Text} from "@chakra-ui/react";
import {NavigationLinkProps} from "../../interfaces/components.ts";

function NavigationLink({icon: Icon, label, to}: NavigationLinkProps) {
    return (
        <NavLink to={to}>
            {({isActive}) => (
                <Flex
                    align="center"
                    gap="2"
                    py="2"
                    px="4"

                    bg={isActive ? "gray.700" : "transparent"}
                    borderRadius="md"
                    _hover={{bg: "gray.700"}}
                    onClick={(e) => {
                        if (isActive) {
                            e.preventDefault();
                        }
                    }}
                >
                    <Icon size="28"/>
                    <Text>{label}</Text>
                </Flex>
            )}
        </NavLink>
    );
}

export default NavigationLink;
