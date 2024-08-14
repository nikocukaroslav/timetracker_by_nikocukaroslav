import { Flex, Heading, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            height="100dvh"
            backgroundColor="gray.100"
            p={4}
        >
            <Heading as='h1' fontSize={{ base: "128px", md: "256px" }}>
                404
            </Heading>
            <Text fontSize="xl" mb={4}>
                Sorry, the page you're looking for cannot be found.
            </Text>
            <Link to="/time-tracker">
                <Button backgroundColor="gray.800" color="white" _hover={{ backgroundColor: "gray.700" }} size="lg">
                    Back to Time Tracker
                </Button>
            </Link>
        </Flex>
    );
}

export default NotFound;
