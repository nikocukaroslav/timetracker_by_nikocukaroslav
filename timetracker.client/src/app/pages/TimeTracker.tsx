import {Flex, List,} from "@chakra-ui/react";
import Timer, {workSessions} from "../../features/time-tracker/components/Timer.tsx";
import WorkSession from "../../features/time-tracker/components/WorkSession.tsx";
import PermissionChecker from "../../components/layouts/PermissionChecker.tsx";
import {MANAGE_OWN_TIME} from "../../constants.ts";

function TimeTracker() {
    return (
        <Flex m="3" direction="column" gap="4">
            <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                <Timer/>
            </PermissionChecker>
            <List display="flex" flexDirection="column" gap="3">
                {workSessions.map((workDay) => {
                    return (
                        <WorkSession key={workDay.id} workDay={workDay}/>
                    );
                })}
            </List>
        </Flex>
    );
}

export default TimeTracker;
