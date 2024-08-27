import { Flex, Grid, GridItem, Icon } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";

import TimeTrackerHeader from "@features/time-tracker/components/TimeTrackerHeader.tsx";
import WorkSessionsList from "@features/time-tracker/components/WorkSessionsList.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import TimeTrackerFooter from "@features/time-tracker/components/TimeTrackerFooter.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";

import { MANAGE_OWN_TIME } from "@constants";

function TimeTracker() {
    return (
        <Grid
            templateRows="auto 1fr auto"
            height="85dvh"
        >
            <GridItem pl="1" pr="1" pb="2">
                <PermissionChecker permissions={[MANAGE_OWN_TIME]}>
                    <TimeTrackerHeader/>
                </PermissionChecker>
            </GridItem>
            <GridItem pl="1" pr="1" overflow="auto">
                <WorkSessionsList/>
            </GridItem>
            <GridItem bg="gray.50" ml="1" mr="1" rounded="md">
                <CustomHorizontalDivider/>
                <TimeTrackerFooter/>
            </GridItem>
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
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={PiPlus} boxSize={8}/>
                </Flex>
            </CreateEditWorkSessionForm>
        </Grid>
    );
}

export default TimeTracker;
