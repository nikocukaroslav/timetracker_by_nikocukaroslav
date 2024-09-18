import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PiKey } from "react-icons/pi";
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';

import CustomInput from "@components/ui/CustomInput.tsx";
import HandlePasswordVisibilityButton from "@features/authentication/components/HandlePasswordVisibilityButton.tsx";
import AuthForm from "@components/ui/forms/AuthForm.tsx";
import Spinner from "@components/ui/Spinner.tsx";
import { useActionState } from "@hooks/useActionState.ts";
import {
    createUserPassword,
    resendCreatePasswordEmail,
    temporaryLinkValidation
} from "@features/authentication/api/actions.ts";
import { schemas } from "@utils/inputHelpers.ts";
import AuthHeader from "@features/authentication/components/AuthHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

const defaultFormData = {
    password: "",
    passwordRepeat: "",
}

function SetPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        loading: linkValidationLoading,
        error: linkValidationError
    } = useActionState(temporaryLinkValidation);
    const {
        fulfilled: resendCreatePasswordFulfilled,
        loading: resendCreatePasswordLoading,
        error: resendCreatePasswordError
    } = useActionState(resendCreatePasswordEmail);
    const {
        fulfilled: createPasswordFulfilled,
        loading: createPasswordLoading,
        error: createPasswordError
    } = useActionState(createUserPassword);

    const error = resendCreatePasswordError || createPasswordError;
    const isLinkExpired = linkValidationError?.code === "LINK_EXPIRED";

    const { temporaryLinkId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleCreatePassword({ password }: {
        password: string;
        passwordRepeat: string;
    }) {
        dispatch(createUserPassword(password, temporaryLinkId as string));
    }

    function handleResendCreatePassword() {
        dispatch(resendCreatePasswordEmail(temporaryLinkId as string));
    }

    useEffect(() => {
        if (temporaryLinkId) {
            dispatch(temporaryLinkValidation(temporaryLinkId));
        }
    }, [])

    useEffect(() => {
        if (linkValidationError && linkValidationError.code !== "LINK_EXPIRED") {
            navigate("/not-found");
        }
    }, [linkValidationError]);

    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [error]);

    useEffect(() => {
        if (resendCreatePasswordFulfilled) {
            toast({
                title: "Email Sent",
                description: "The letter has been sent to your email",
                status: "success",
                duration: 15000,
                isClosable: true,
                onCloseComplete: () => {
                    window.close();
                },
            });
        }
    }, [resendCreatePasswordFulfilled]);

    useEffect(() => {
        if (createPasswordFulfilled) {
            navigate("/sign-in", { replace: true });
        }
    }, [createPasswordFulfilled]);

    if (linkValidationLoading)
        return <Spinner/>

    return (
        !isLinkExpired ? (
            <AuthForm
                onSubmit={isLinkExpired ? handleResendCreatePassword : handleCreatePassword}
                initialValues={defaultFormData}
                validationSchema={schemas.resetPasswordSchema}
            >
                <CustomInput
                    name="password"
                    label="New password"
                    icon={PiKey}
                    type={showPassword ? "text" : "password"}
                    children={<HandlePasswordVisibilityButton onClick={handleClick} showPassword={showPassword}/>}
                />
                <CustomInput
                    name="passwordRepeat"
                    label="Repeat password"
                    icon={PiKey}
                    type={showPassword ? "text" : "password"}
                    children={<HandlePasswordVisibilityButton onClick={handleClick} showPassword={showPassword}/>}
                />
                <Button
                    type="submit"
                    mt="auto"
                    borderColor="gray.300" borderWidth="2px"
                    _hover={{ borderColor: "gray.500", bg: "gray.50" }}
                    isLoading={createPasswordLoading}
                >
                    Continue
                </Button>
            </AuthForm>
        ) : (
            <Flex align="center" justify="center" bg="gray.100" overflow="hidden" h="100dvh" color="gray.700">
                <Box
                    w="25%"
                    minW="420px"
                    bg="gray.50"
                    rounded="md"
                    boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                >
                    <Flex p="5" direction="column" gap="5" h="full">
                        <AuthHeader/>
                        <CustomHorizontalDivider/>
                        <Text align="center" fontSize="sm" color="gray.500" letterSpacing="1px">
                            The link is no longer available
                        </Text>
                        <Button
                            mt="auto"
                            borderColor="gray.300"
                            borderWidth="2px"
                            _hover={{ borderColor: "gray.500", bg: "gray.50" }}
                            isLoading={resendCreatePasswordLoading}
                            onClick={handleResendCreatePassword}
                        >
                            Send a new link
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        )
    )
}

export default SetPassword;