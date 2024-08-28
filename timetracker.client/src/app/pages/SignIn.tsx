import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Icon, Text } from "@chakra-ui/react";
import { PiKey, PiSignIn, PiUser } from "react-icons/pi";

import CustomInput from "@components/ui/CustomInput";

import { login } from "@features/authentication/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import AuthForm from "@features/authentication/components/AuthForm.tsx";
import HandlePasswordVisibilityButton from "@features/authentication/components/HandlePasswordVisibilityButton.tsx";
import { schemas } from "@utils/inputHelpers.ts";

const defaultFormData = {
    email: "",
    password: "",
}

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const loginStatus = useAppSelector(state => state.authentication.user);
    const loading = useAppSelector(state => state.authentication.loading);
    const error = useAppSelector(state => state.authentication.error);

    const dispatch = useDispatch();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleLogin(values, actions) {
        const { email, password } = {
            ...values,
        };

        dispatch(login(email, password));
    }

    if (loginStatus)
        return <Navigate to="/time-tracker"/>;

    return (
        <AuthForm onSubmit={handleLogin} initialValues={defaultFormData}
                  validationSchema={schemas.signInSchema}>
            <CustomInput
                name="email"
                icon={PiUser}
                label="Login"
                type="text"
                isRequired
            />
            <CustomInput
                children={
                    <HandlePasswordVisibilityButton onClick={handleClick} showPassword={showPassword}/>
                }
                name="password"
                icon={PiKey}
                label="Password"
                type={showPassword ? "text" : "password"}
                isRequired
            />
            {/*         <NavLink to="password-recovery">
                <Text mt="-5" fontSize="sm" textColor="gray.500"
                      _hover={{ textDecoration: "underline" }}>
                    Forgot password</Text>
            </NavLink>*/}
            <Text color="red.500">{error}</Text>
            <Button
                type="submit"
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