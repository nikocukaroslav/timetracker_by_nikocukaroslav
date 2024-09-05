import { Button, HStack, Text } from "@chakra-ui/react";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { PiPlus } from "react-icons/pi";

function WorkSessionHeader() {
    return (
        <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="500">Work sessions</Text>
            <CreateEditWorkSessionForm>
                <Button leftIcon={<PiPlus/>} ml="auto">Add session</Button>
            </CreateEditWorkSessionForm>
        </HStack>
    );
}

export default WorkSessionHeader;