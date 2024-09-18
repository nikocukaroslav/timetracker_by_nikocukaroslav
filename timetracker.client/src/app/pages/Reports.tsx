import ReportList from "@features/reports/components/ReportList.tsx";
import { Grid, GridItem } from "@chakra-ui/react";
import ReportsHeader from "@features/reports/components/ReportsHeader.tsx";
import ReportsFooter from "@features/reports/components/ReportsFooter.tsx";
import { ReportsContext } from "@features/reports/context/reportContext.ts";
import { useState } from "react";

function Reports() {
    const initialDate = new Date()

    const [currentDate, setCurrentDate] = useState<Date>(initialDate);

    return (
        <ReportsContext.Provider value={{
            currentDate,
            setCurrentDate
        }}>
            <Grid
                templateRows="auto 1fr"
                gap={4}
                height="calc(100dvh - 3%)"
            >
                <ReportsHeader/>
                <GridItem overflow="auto" bg="gray.50" rounded="md" boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)">
                    <ReportList/>
                </GridItem>
                <ReportsFooter/>
            </Grid>
        </ReportsContext.Provider>
    );
}

export default Reports;