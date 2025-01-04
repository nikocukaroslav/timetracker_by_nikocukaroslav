import TitledText from "@components/ui/TitledText.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { Flex } from "@chakra-ui/react";

function CalendarHeading() {
    const user = useAppSelector(state => state.calendar.user);
    const accountId = useAppSelector(state => state.authentication.user?.id);

    const title = !user || accountId === user.id
        ? "Your calendar"
        : `Calendar ${user?.name} ${user?.surname}`;

    return (
        <Flex w={72} justifyContent="end">
            <TitledText title={title} fontSize="xl" fontWeight={450}>
                {title}
            </TitledText>
        </Flex>
    );
}

export default CalendarHeading;
