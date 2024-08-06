import {Flex} from "@chakra-ui/react";
import Timer from "./Timer.tsx";

function GlobalTimer() {
    return (
        <Flex position="absolute" w="36" h="16" alignItems="center" justifyContent="center"
              rounded="md"
              backgroundColor="gray.800" bottom="3"
              right="3"
              zIndex="10">
            <Timer color="gray.50"/>
        </Flex>
    );
}

export default GlobalTimer;