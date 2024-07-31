import {Button, Flex, Text} from "@chakra-ui/react";
import {PiDiceThree} from "react-icons/pi";
import {RandomPasswordButtonProps} from "../../../interfaces/components.ts";

function RandomPasswordButton({setRandomPassword}: RandomPasswordButtonProps) {
    return (
        <Button
            position="absolute"
            top="0"
            right="2"
            variant="ghost"
            size="xs"
            onClick={setRandomPassword}
        >
            <Flex gap="1">
                <PiDiceThree size="18px"/> <Text mt="2px">Generate</Text>
            </Flex>
        </Button>
    );
}

export default RandomPasswordButton;