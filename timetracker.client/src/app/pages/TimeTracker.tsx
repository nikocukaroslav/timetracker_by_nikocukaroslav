import { Grid, GridItem } from "@chakra-ui/react";

import TimeTrackerHeader from "@features/time-tracker/components/TimeTrackerHeader.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";

import { MANAGE_OWN_TIME } from "@constants";
import WorkSessionsList from "@features/time-tracker/components/WorkSessionsList.tsx";
import WorkSessionHeader from "@features/time-tracker/components/WorkSessionHeader.tsx";
import TimeTrackerFooter from "@features/time-tracker/components/TimeTrackerFooter.tsx";

function TimeTracker() {

    return (
        <Grid
            gap={2}
            templateRows="auto auto 1fr auto"
            height="calc(100dvh - 3%)">
            <GridItem>
                <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                    <TimeTrackerHeader/>
                </PermissionChecker>
            </GridItem>
            <GridItem>
                <WorkSessionHeader/>
            </GridItem>
            <GridItem px={1} overflow="auto">
                <WorkSessionsList/>
            </GridItem>
            <GridItem>
                <TimeTrackerFooter/>
            </GridItem>
        </Grid>
    );
}

export default TimeTracker;
