import { Button, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiKey } from "react-icons/pi";

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
import HandlePasswordVisibilityButton from "@features/authentication/components/HandlePasswordVisibilityButton.tsx";
import { schemas } from "@utils/inputHelpers.ts";

const defaultFormData = {
    password: "",
    passwordRepeat: "",
}

function SetPassword() {
    const { temporaryLinkId } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const loading = useAppSelector(state => state.authentication.loading);
    const error: string | null = useAppSelector(state => state.authentication.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleCreatePassword(values) {
        const { password, passwordRepeat } = values;

        if (password === passwordRepeat && temporaryLinkId != undefined) {
            console.log("Dispatching createUserPassword action");
            dispatch(createUserPassword(password, temporaryLinkId));
        } else {
            console.log("Passwords do not match");
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
                    title: "An error occurred",
                    description: `An error occurred: ${resendCreatePasswordEmailStatus}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }, [resendCreatePasswordEmailStatus, isTemporaryLinkValid]);

    const isPageFound = useAppSelector(state => state.authentication.isPageFound);

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
        <AuthForm onSubmit={temporaryLinkId ? handleCreatePassword : handleResendCreatePasswordEmail}
                  initialValues={defaultFormData}
                  validationSchema={schemas.resetPasswordSchema}
        >
            {isTemporaryLinkValid ?
                (<>
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
                    <Text color="red.500">{error}</Text>
                    <Button
                        type="submit"
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
                        type="submit"
                        mt="auto"
                        borderColor="gray.300" borderWidth="2px"
                        _hover={{ borderColor: "gray.500", bg: "gray.50" }}
                        isLoading={loading}
                    >
                        Send a new link
                    </Button>
                </>)
            }
        </AuthForm>
    )
}

export default SetPassword;