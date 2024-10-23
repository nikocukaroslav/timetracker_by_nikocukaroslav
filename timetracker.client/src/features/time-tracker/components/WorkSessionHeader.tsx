import { Button, HStack, Text } from "@chakra-ui/react";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { PiPlus } from "react-icons/pi";
import WorkSessionSearch from "@features/time-tracker/components/WorkSessionSearch.tsx";

function WorkSessionHeader() {
    return (
        <HStack justifyContent="space-between" mx={4}>
            <Text fontSize="xl" fontWeight="500">Work sessions</Text>
            <WorkSessionSearch/>
            <CreateEditWorkSessionForm>
                <Button leftIcon={<PiPlus/>}>Add session</Button>
            </CreateEditWorkSessionForm>
        </HStack>
    );
}

export default WorkSessionHeader;