import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Flex } from "@chakra-ui/react";

import TimeTrackerHeader from "@features/time-tracker/components/TimeTrackerHeader.tsx";
import WorkSessionsList from "@features/time-tracker/components/WorkSessionsList.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";

import { getWorkSessions } from "@features/time-tracker/api/actions.ts";
import { MANAGE_OWN_TIME } from "@constants";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function TimeTracker() {
    const userId = useAppSelector(state => state.authentication.user.id)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkSessions(userId))
    }, [dispatch, userId]);

    return (
        <Flex direction="column" gap="4">
            <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                <TimeTrackerHeader/>
            </PermissionChecker>
            <WorkSessionsList/>
        </Flex>
    );
}

export default TimeTracker;
