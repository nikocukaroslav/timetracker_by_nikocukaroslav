import TitledText from "@components/ui/TitledText.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";

function CalendarHeading() {
    const user = useAppSelector(state => state.calendar.user);
    const accountId = useAppSelector(state => state.authentication.user?.id);

    const title = !user || accountId === user.id
        ? "Your calendar"
        : `Calendar ${user?.name} ${user?.surname}`;

    return (
        <TitledText w={72} title={title} fontSize="xl" fontWeight="450">
            {title}
        </TitledText>
    );
}

export default CalendarHeading;
