import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

import AuthHeader from "@features/authentication/components/AuthHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

function AuthForm({ children }: { children: ReactNode }) {
    return (
        <Flex align="center" justify="center" bg="gray.100" overflow="hidden" h="100dvh" color="gray.700">
            <Box
                w="25%" minW="420px" bg="gray.50" rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)">
                <Flex p="5" direction="column" gap="5" h="full">
                    <AuthHeader/>
                    <CustomHorizontalDivider/>
                    {children}
                </Flex>
            </Box>
        </Flex>
    );
}

export default AuthForm;