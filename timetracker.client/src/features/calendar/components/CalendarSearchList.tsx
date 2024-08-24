import { useContext } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";

import { CalendarContext } from "@features/calendar/context/calendarContext.tsx";
import { CalendarContextType } from "@features/calendar/types/calendar.ts";
import { CalendarSearchListProps } from "@features/calendar/types/components.ts";

function CalendarSearchList({ users, handleSelectUser }: CalendarSearchListProps) {
    const { userId } = useContext(CalendarContext) as CalendarContextType;

    return (
        users.length
            ? (
                <Stack>
                    {users.map(({ id, name, surname, email }) => {
                        const selected = id === userId;
                        const onClick = !selected ? () => handleSelectUser(id) : undefined;

                        return (
                            <Flex
                                key={id}
                                direction="column"
                                px={4}
                                py={2}
                                rounded="md"
                                cursor="pointer"
                                _hover={{
                                    bg: "gray.100"
                                }}
                                bg={selected ? "gray.100" : undefined}
                                onClick={onClick}
                            >
                                <Text>{name} {surname}</Text>
                                <Text fontSize="sm" color="gray.500">{email}</Text>
                            </Flex>
                        )
                    })}
                </Stack>
            )
            : <Text>Employee not found</Text>
    );
}

export default CalendarSearchList;
