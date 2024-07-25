import {Box, Button, Divider, Flex, FormLabel, Icon, Img, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {PiKey, PiSignIn, PiUser} from "react-icons/pi";
import CustomInput from "../../components/ui/CustomInput.tsx";
import {BiHide, BiShow} from "react-icons/bi";
import {useState} from "react";
import {NavLink} from "react-router-dom";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    function handleClick() {
        setShowPassword(!showPassword);
    }

    return (
        <Flex as="main" align="center" justify="center" bg="gray.100" h="100dvh" color="gray.700">
            <Box
                w="25%" h="50%" bg="gray.50" rounded="md"
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
                    <Divider borderColor="gray.300" w="full" borderWidth="1.5px"/>
                    <FormLabel>
                        <Flex gap="2" mb="2">
                            <Icon as={PiUser} w="24px" h="24px"/>
                            <Text>Login</Text>
                        </Flex>
                        <CustomInput type="text"/>
                    </FormLabel>
                    <FormLabel display="flex" flexDirection="column" gap="1">
                        <Flex gap="2" mb="2">
                            <Icon as={PiKey} w="24px" h="24px"/>
                            <Text>Password</Text>
                        </Flex>
                        <InputGroup>
                            <CustomInput
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <InputRightElement>
                                <Box w="24px" onClick={handleClick}>
                                    {showPassword ? (
                                        <BiHide size="md"/>
                                    ) : (
                                        <BiShow size="md"/>
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
                    <Button display="flex" gap="2" mt="auto"
                            borderColor="gray.300" borderWidth="2px"
                            _hover={{borderColor: "gray.500", bg: "gray.50"}}>
                        <Icon as={PiSignIn} h="24px" w="24px"/>
                        <Text>Sign in</Text>
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

export default SignIn;