import { Box, Spinner as ChakraSpinner } from "@chakra-ui/react";

function Spinner() {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(5px)"
            zIndex="9999"
        >
            <ChakraSpinner size="xl"/>
        </Box>
    );
}

export default Spinner;