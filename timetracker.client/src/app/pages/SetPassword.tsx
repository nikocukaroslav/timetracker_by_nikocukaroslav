import { Box, Button, Flex, FormLabel, Icon, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiKey } from "react-icons/pi";
import { BiHide, BiShow } from "react-icons/bi";

import CustomInput from "@components/ui/CustomInput.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { setError } from "@features/authentication/authenticationSlice.ts";
import {
    createUserPassword,
    resendCreatePasswordEmail,
    temporaryLinkValidation
} from "@features/authentication/api/actions.ts";
import { useNavigate, useParams } from "react-router-dom";
import AuthForm from "@features/authentication/components/AuthForm.tsx";

function SetPassword() {
    const { temporaryLinkId } = useParams();
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const loading = useAppSelector(state => state.authentication.loading);
    const error: string | null = useAppSelector(state => state.authentication.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleCreatePassword() {
        if (password === passwordRepeat && temporaryLinkId != undefined) {
            dispatch(createUserPassword(password, temporaryLinkId));
        } else {
            dispatch(setError("Passwords do not match"));
        }
    }

    const isTemporaryLinkValid: boolean = useAppSelector(state => state.authentication.isTemporaryLinkValid);

    function handleResendCreatePasswordEmail() {
        if (!isTemporaryLinkValid && temporaryLinkId != undefined) {
            dispatch(setError(null));
            dispatch(resendCreatePasswordEmail(temporaryLinkId));
        }
    }

    const resendCreatePasswordEmailStatus = useAppSelector(state => state.authentication.resendCreatePasswordEmailStatus);
    useEffect(() => {
        if (!isTemporaryLinkValid && temporaryLinkId != undefined && resendCreatePasswordEmailStatus != null) {
            if (error == null) {
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
            } else {
                toast({
                    title: 'Error',
                    description: `An error occurred: ${resendCreatePasswordEmailStatus}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }, [resendCreatePasswordEmailStatus, isTemporaryLinkValid]);

    const isPageFound: boolean = useAppSelector(state => state.authentication.isPageFound);
    useEffect(() => {
        if (temporaryLinkId != undefined) {
            dispatch(setError(null));
            dispatch(temporaryLinkValidation(temporaryLinkId));
        }
        if (!isPageFound || temporaryLinkId == undefined) {
            dispatch(setError(null));
            navigate("/auth/not-found");
        }
    }, [navigate, dispatch, isPageFound]);

    const createPasswordResult = useAppSelector(state => state.authentication.createPasswordResult);
    useEffect(() => {
        if (createPasswordResult) {
            dispatch(setError(null));
            navigate("/sign-in");
        }
    }, [navigate, dispatch, createPasswordResult]);

    return (
        <AuthForm>
            {isTemporaryLinkValid ?
                (<>
                    <FormLabel>
                        <Flex gap="2" mb="2">
                            <Icon as={PiKey} w="24px" h="24px"/>
                            <Text>Password</Text>
                        </Flex>
                        <InputGroup>
                            <CustomInput
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <InputRightElement>
                                <Box w="24px" onClick={handleClick}>
                                    {showPassword ? (
                                        <BiHide size="24px"/>
                                    ) : (
                                        <BiShow size="24px"/>
                                    )}
                                </Box>
                            </InputRightElement>
                        </InputGroup>
                    </FormLabel>
                    <FormLabel display="flex" flexDirection="column" gap="1">
                        <Flex gap="2" mb="2">
                            <Icon as={PiKey} w="24px" h="24px"/>
                            <Text>Repeat password</Text>
                        </Flex>
                        <InputGroup>
                            <CustomInput
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                                required
                            />
                            <InputRightElement>
                                <Box w="24px" onClick={handleClick}>
                                    {showPassword ? (
                                        <BiHide size="24px"/>
                                    ) : (
                                        <BiShow size="24px"/>
                                    )}
                                </Box>
                            </InputRightElement>
                        </InputGroup>
                    </FormLabel>
                    <Text color="red.500">{error}</Text>
                    <Button
                        onClick={handleCreatePassword}
                        mt="auto"
                        borderColor="gray.300" borderWidth="2px"
                        _hover={{ borderColor: "gray.500", bg: "gray.50" }}
                        isLoading={loading}
                    >
                        Continue
                    </Button>
                </>)
                :
                (<>
                    <Text align="center" fontSize="sm" color="gray.500" letterSpacing="1px">
                        The link is no longer available
                    </Text>
                    <Button
                        onClick={handleResendCreatePasswordEmail}
                        mt="auto"
                        borderColor="gray.300" borderWidth="2px"
                        _hover={{ borderColor: "gray.500", bg: "gray.50" }}
                        isLoading={loading}
                    >
                        Submit a new link
                    </Button>
                </>)
            }
        </AuthForm>
    )
}

export default SetPassword;