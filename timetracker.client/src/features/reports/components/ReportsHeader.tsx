import ReportsControls from "@features/reports/components/ReportsControls.tsx";
import { Flex, Spacer } from "@chakra-ui/react";

function ReportsHeader() {
    return (
        <Flex>
            <ReportsControls/>
            <Spacer/>
        </Flex>
    );
}

export default ReportsHeader;