import ReportsFilter from "@features/reports/components/ReportsFilter.tsx";
import { Button } from "@chakra-ui/react";
import { PiFunnel } from "react-icons/pi";

function ReportsFilterButton() {
    return (
        <ReportsFilter>
            <Button leftIcon={<PiFunnel/>}>Filter</Button>
        </ReportsFilter>
    );
}

export default ReportsFilterButton;