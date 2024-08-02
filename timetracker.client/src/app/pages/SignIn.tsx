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
    Spinner,
    Text
} from "@chakra-ui/react";
import {PiKey, PiSignIn, PiUser} from "react-icons/pi";
import CustomInput from "../../components/ui/CustomInput.tsx";
import {BiHide, BiShow} from "react-icons/bi";
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../../features/authentication/authenticationSlice.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector.ts";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginStatus = useAppSelector(state => state.authentication.loginStatus);
    const loading = useAppSelector(state => state.authentication.loading);
    const error = useAppSelector(state => state.authentication.error);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick() {
        setShowPassword(!showPassword);
    }

    function handleLogin() {
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (loginStatus)
            navigate("/");
    }, [loginStatus, navigate]);

    return (
        <Flex as="main" align="center" justify="center" bg="gray.100" overflow="hidden" h="100dvh" color="gray.700">
            <Box
                w="25%" h="50%" minW="420px" bg="gray.50" rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)">

                <Flex p="5" direction="column" gap="5" h="full">
                    <Box>
                        <Flex align="center" gap="3" justify="center" mb="2">
                            <Img src="../../../public/favicon-by-cake.ico" w="44px" h="44px"/>
                            <Text fontSize="xl" letterSpacing="0.5px">Time Tracker</Text>
                        </Flex>
                        <Text align="center" fontSize="sm" color="gray.500" letterSpacing="1px">Time manager for your
                            company
                        </Text>
                    </Box>
                    <Divider borderColor="gray.300" borderWidth="1px"/>
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
                                  _hover={{textDecoration: "underline"}}>
                                Forgot password</Text>
                        </NavLink>
                    </FormLabel>
                    <Text color="red.500">{error}</Text>
                    <Button
                        onClick={handleLogin}
                        display="flex" gap="2" mt="auto"
                        borderColor="gray.300" borderWidth="2px"
                        disabled={loading}
                        _hover={{borderColor: "gray.500", bg: "gray.50"}}>
                        {
                            loading ? <Spinner width="24px" h="24px"/> :
                                <>
                                    <Icon as={PiSignIn} h="24px" w="24px"/>
                                    <Text>Sign in</Text>
                                </>
                        }
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

export default SignIn;