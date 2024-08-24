import TitledText from "@components/ui/TitledText.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";

function CalendarHeading() {
    const user = useAppSelector(state => state.calendar.user);
    const accountId = useAppSelector(state => state.authentication.user?.id);

    const title = !user || accountId === user.id
        ? "Your calendar"
        : `Calendar ${user?.name} ${user?.surname}`;

    return (
        <TitledText title={title} fontSize={24} fontWeight="bold">
            {title}
        </TitledText>
    );
}

export default CalendarHeading;
