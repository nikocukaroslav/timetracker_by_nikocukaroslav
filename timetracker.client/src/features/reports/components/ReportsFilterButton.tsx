import { Button, Flex } from "@chakra-ui/react";
import { PiFunnel } from "react-icons/pi";
import ReportsFilter from "@features/reports/components/ReportsFilter.tsx";

function ReportsFilterButton() {
    return (
        <Flex justifyContent="end" w={72}>
            <ReportsFilter>
                <Button leftIcon={<PiFunnel/>}>Filter</Button>
            </ReportsFilter>
        </Flex>

    );
}

export default ReportsFilterButton;