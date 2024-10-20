import { Button, Icon } from "@chakra-ui/react";
import { PiHouse } from "react-icons/pi";

function HomeButton({ onClick }) {
    return (
        <Button
            position="absolute"
            rounded="full"
            borderColor="gray.300"
            borderWidth={2}
            bottom={5}
            right={5} h={16}
            w={16}
            onClick={onClick}
        >
            <Icon as={PiHouse}
                  boxSize={8}/>
        </Button>
    );
}

export default HomeButton;