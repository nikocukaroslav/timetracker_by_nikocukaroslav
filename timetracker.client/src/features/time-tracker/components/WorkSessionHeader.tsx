import { Button, HStack, Text } from "@chakra-ui/react";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { PiPlus } from "react-icons/pi";
import WorkSessionSearch from "@features/time-tracker/components/WorkSessionSearch.tsx";
import PermissionChecker from "@components/layouts/PermissionChecker.tsx";
import { MANAGE_SOMEONES_WORK_SESSIONS } from "@constants";

function WorkSessionHeader() {
    return (
        <HStack justifyContent="space-between" mx={4}>
            <Text fontSize="xl" fontWeight="500">Work sessions</Text>
            <PermissionChecker permissions={[MANAGE_SOMEONES_WORK_SESSIONS]}>
                <WorkSessionSearch/>
            </PermissionChecker>
            <CreateEditWorkSessionForm>
                <Button leftIcon={<PiPlus/>}>Add session</Button>
            </CreateEditWorkSessionForm>
        </HStack>
    );
}

export default WorkSessionHeader;