import { PiPlus } from "react-icons/pi";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

import WorkSessionsList from "@features/time-tracker/components/WorkSessionsList.tsx";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";

function TimeTrackerBody() {
    return (
        <Box flex="1">
            <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="500">Work sessions</Text>

                <CreateEditWorkSessionForm>
                    <Button leftIcon={<PiPlus/>} ml="auto">Add session</Button>
                </CreateEditWorkSessionForm>
            </HStack>
            <WorkSessionsList/>
        </Box>
    );
}

export default TimeTrackerBody;
