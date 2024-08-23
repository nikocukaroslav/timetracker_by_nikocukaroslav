import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { Box, Button, Flex, FormLabel, Icon, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { PiKey, PiSignIn, PiUser } from "react-icons/pi";
import { BiHide, BiShow } from "react-icons/bi";

import CustomInput from "@components/ui/CustomInput";

import { login } from "@features/authentication/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import AuthForm from "@features/authentication/components/AuthForm.tsx";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginStatus = useAppSelector(state => state.authentication.user);
    const loading = useAppSelector(state => state.authentication.loading);
    const error = useAppSelector(state => state.authentication.error);

    const dispatch = useDispatch();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleLogin() {
        dispatch(login(email, password))
    }

    if (loginStatus)
        return <Navigate to="/time-tracker"/>;

    return (
        <AuthForm>
            <FormLabel>
                <Flex gap="2" mb="2">
                    <Icon as={PiUser} w="24px" h="24px"/>
                    <Text>Login</Text>
                </Flex>
                <CustomInput
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </FormLabel>
            <FormLabel display="flex" flexDirection="column" gap="1">
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
                <NavLink to="password-recovery">
                    <Text mt="1" fontSize="sm" textColor="gray.500"
                          _hover={{ textDecoration: "underline" }}>
                        Forgot password</Text>
                </NavLink>
            </FormLabel>
            <Text color="red.500">{error}</Text>
            <Button
                onClick={handleLogin}
                mt="auto"
                borderColor="gray.300" borderWidth="2px"
                _hover={{ borderColor: "gray.500", bg: "gray.50" }}
                isLoading={loading}
                leftIcon={<Icon as={PiSignIn} h="24px" w="24px"/>}
            >
                Sign in
            </Button>
        </AuthForm>
    );
}

export default SignIn;