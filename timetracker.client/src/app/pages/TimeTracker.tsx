import {Flex,} from "@chakra-ui/react";
import TimeTrackerHeader from "../../features/time-tracker/components/TimeTrackerHeader.tsx";
import PermissionChecker from "../../components/layouts/PermissionChecker.tsx";
import {MANAGE_OWN_TIME} from "../../constants.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import WorkSessionsList from "../../features/time-tracker/components/WorkSessionsList.tsx";
import {getWorkSessions} from "../../features/time-tracker/api/actions.ts";

function TimeTracker() {
    const userId = useAppSelector(state => state.authentication.user.id)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkSessions(userId))
    }, [dispatch, userId]);

    return (
        <Flex direction="column" gap="4" h="100dvh">
            <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                <TimeTrackerHeader/>
            </PermissionChecker>
            <WorkSessionsList/>
        </Flex>
    );
}

export default TimeTracker;
