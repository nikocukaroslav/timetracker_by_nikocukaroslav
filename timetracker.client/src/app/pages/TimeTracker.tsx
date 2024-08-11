import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Flex, Icon } from "@chakra-ui/react";

import TimeTrackerHeader from "@features/time-tracker/components/TimeTrackerHeader.tsx";
import WorkSessionsList from "@features/time-tracker/components/WorkSessionsList.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";

import { getWorkSessions } from "@features/time-tracker/api/actions.ts";
import { MANAGE_OWN_TIME } from "@constants";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { PiPlus } from "react-icons/pi";

function TimeTracker() {
    const userId = useAppSelector(state => state.authentication.user?.id)
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
            <CreateEditWorkSessionForm>
                <Flex
                    title="Add session"
                    position="fixed"
                    bottom={4}
                    right={4}
                    p={4}
                    rounded="full"
                    bg="gray.50"
                    boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                    transition="all 0.2s"
                    cursor="pointer"
                    _hover={{bg: "gray.200"}}
                >
                    <Icon as={PiPlus} boxSize={8}/>
                </Flex>
            </CreateEditWorkSessionForm>
        </Flex>
    );
}

export default TimeTracker;
