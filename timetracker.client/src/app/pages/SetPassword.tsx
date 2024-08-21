import {
    Box,
    Button,
    Divider,
    Flex,
    FormLabel,
    Icon,
    Img,
    InputGroup,
    InputRightElement,
    Text
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiKey } from "react-icons/pi";
import { BiHide, BiShow } from "react-icons/bi";

import CustomInput from "@components/ui/CustomInput.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { setError } from "@features/authentication/authenticationSlice.ts";
import { createUserPassword } from "@features/authentication/api/actions.ts";
import { useNavigate, useParams } from "react-router-dom";

function SetPassword() {
    const { temporaryLinkId} = useParams();
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loading = useAppSelector(state => state.authentication.loading);
    const setPasswordResult = useAppSelector(state => state.authentication.setPasswordResult);
    const error : string | null = useAppSelector(state => state.authentication.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleCreatePassword() {
        if (password === passwordRepeat && temporaryLinkId != undefined) {
            dispatch(createUserPassword(password, temporaryLinkId));
        }
        else {
            dispatch(setError("Passwords do not match"));
        }
    }

    useEffect(()=> {
        if(setPasswordResult) {
            dispatch(setError(null));
            navigate("/sign-in");
        }
    },[navigate, setPasswordResult]);

    return (
        <Flex as="main" align="center" justify="center" bg="gray.100" overflow="hidden" h="100dvh" color="gray.700">
            <Box
                w="25%" minW="420px" bg="gray.50" rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)">

                <Flex p="5" direction="column" gap="5" h="full">
                    <Box>
                        <Flex align="center" gap="3" justify="center" mb="2">
                            <Img src="/favicon-by-cake.ico" w="44px" h="44px"/>
                            <Text fontSize="xl" letterSpacing="0.5px">Time Tracker</Text>
                        </Flex>
                        <Text align="center" fontSize="sm" color="gray.500" letterSpacing="1px">
                            Welcome to the company
                        </Text>
                    </Box>
                    <Divider borderColor="gray.300" borderWidth="1px"/>
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
                        _hover={{ borderColor: "gray.500", bg: "blue.100" }}
                        isLoading={loading}
                    >
                        Continue
                    </Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default SetPassword;