import { NavLink } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavigationLinkProps {
   icon: IconType;
   label: string;
   to: string;
}

function NavigationLink({ icon: Icon, label, to }: NavigationLinkProps) {
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
            >
               <Icon size="28" />
               <Text>{label}</Text>
            </Flex>
         )}
      </NavLink>
   );
}

export default NavigationLink;
