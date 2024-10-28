import { AbsoluteCenter, Grid, GridItem, Spinner } from "@chakra-ui/react";

import TimeTrackerTimer from "@features/time-tracker/components/TimeTrackerTimer.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";

import { MANAGE_OWN_TIME } from "@constants";
import WorkSessionsList from "@features/time-tracker/components/WorkSessionsList.tsx";
import WorkSessionHeader from "@features/time-tracker/components/WorkSessionHeader.tsx";
import TimeTrackerFooter from "@features/time-tracker/components/TimeTrackerFooter.tsx";
import { TimeTrackerContext } from "@features/time-tracker/context/timeTrackerContext.ts";
import { useState } from "react";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useActionState } from "@hooks/useActionState.ts";
import { getReports } from "@features/time-tracker/api/actions.ts";

function TimeTracker() {
    const { loading } = useActionState(getReports);
    const accountId = useAppSelector(state => state.authentication.user?.id);
    const permissions = useAppSelector(state => state.authentication.user?.permissions);
    const workSessions = useAppSelector(state => state.timeTracker.workSessions);
    const [userId, setUserId] = useState(accountId as string);

    return (
        <TimeTrackerContext.Provider value={{
            userId,
            setUserId
        }}>
            <Grid
                gap={2}
                templateRows={`${permissions?.includes(MANAGE_OWN_TIME) && "auto"} auto 1fr auto`}
                height="calc(100dvh - 3%)"
            >
                <GridItem>
                    <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                        <TimeTrackerTimer/>
                    </PermissionChecker>
                </GridItem>
                <GridItem>
                    <WorkSessionHeader/>
                </GridItem>
                <GridItem px={1} overflow="auto">
                    {
                        loading ? (
                            <AbsoluteCenter>
                                <Spinner size="xl"/>
                            </AbsoluteCenter>
                        ) : workSessions.length > 0 ? (
                            <WorkSessionsList/>
                        ) : (

                            <AbsoluteCenter>
                                Work sessions not found
                            </AbsoluteCenter>
                        )
                    }
                </GridItem>
                <GridItem>
                    <TimeTrackerFooter/>
                </GridItem>
            </Grid>
        </TimeTrackerContext.Provider>
    );
}

export default TimeTracker;

