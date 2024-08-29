import { Stack } from "@chakra-ui/react";

import TimeTrackerHeader from "@features/time-tracker/components/TimeTrackerHeader.tsx";
import TimeTrackerBody from "@features/time-tracker/components/TimeTrackerBody.tsx";
import TimeTrackerFooter from "@features/time-tracker/components/TimeTrackerFooter.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";

import { MANAGE_OWN_TIME } from "@constants";

function TimeTracker() {
    return (
        <Stack flex={1}>
            <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                <TimeTrackerHeader/>
            </PermissionChecker>
            <TimeTrackerBody/>
            <TimeTrackerFooter/>
        </Stack>
    );
}

export default TimeTracker;
