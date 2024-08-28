import { Box, InputRightElement } from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import { MouseEventHandler } from "react";

interface HandlePasswordVisibilityButtonProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    showPassword: boolean;
}

function HandlePasswordVisibilityButton({ onClick, showPassword }: HandlePasswordVisibilityButtonProps) {
    return (
        <InputRightElement>
            <Box w="24px" onClick={onClick}>
                {showPassword ? (
                    <BiHide size="24px"/>
                ) : (
                    <BiShow size="24px"/>
                )}
            </Box>
        </InputRightElement>
    );
}

export default HandlePasswordVisibilityButton;