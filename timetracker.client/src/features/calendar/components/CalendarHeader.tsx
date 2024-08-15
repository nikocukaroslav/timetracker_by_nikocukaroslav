import { Center, SimpleGrid } from "@chakra-ui/react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CalendarHeader() {
    return (
        <SimpleGrid columns={7} w="full" bg="gray.200">
            {days.map((day, i) =>
                <Center fontWeight="bold" border="1px" borderColor="gray.300" key={i}>
                    {day.toUpperCase()}
                </Center>
            )}
        </SimpleGrid>
    );
}

export default CalendarHeader;
