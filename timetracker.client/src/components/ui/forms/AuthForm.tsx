import { Box, Flex } from "@chakra-ui/react";

import AuthHeader from "@features/authentication/components/AuthHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import { Form, Formik } from "formik";

import { AuthFormProps } from "@interfaces/components.ts";

function AuthForm({ children, onSubmit, ...props }: AuthFormProps) {
    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
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
            </Form>
        </Formik>
    );
}

export default AuthForm;