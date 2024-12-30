import { AbsoluteCenter, Grid, GridItem, HStack, Spinner } from "@chakra-ui/react";
import ReportsHeader from "@features/reports/components/ReportsHeader.tsx";
import ReportsFooter from "@features/reports/components/ReportsFooter.tsx";
import { ReportsContext } from "@features/reports/context/reportContext.ts";
import { useEffect, useState } from "react";
import ReportsSearch from "@features/reports/components/ReportsSearch.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import ReportList from "@features/reports/components/ReportList.tsx";
import ReportsTableHeader from "@features/reports/components/ReportsTableHeader.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import { getRoles } from "@features/roles/api/actions.ts";
import { useDispatch } from "react-redux";
import ReportsFilterButton from "@features/reports/components/ReportsFilterButton.tsx";

function Reports() {
    const reports = useAppSelector(state => state.reports.reports);
    const initialDate = new Date();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [currentDate, setCurrentDate] = useState<Date>(initialDate);

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);

    return (
        <ReportsContext.Provider value={{
            setLoading,
            currentDate,
            setCurrentDate
        }}>
            <Grid
                templateRows="auto 1fr"
                gap={2}
                height="calc(100dvh - 3%)"
            >
                <HStack mx={4} justifyContent="space-between">
                    <ReportsHeader/>
                    <ReportsSearch/>
                    <ReportsFilterButton/>
                </HStack>

                <GridItem overflow="auto" bg="gray.50" rounded="md" boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)">
                    <ReportsTableHeader/>
                    <CustomHorizontalDivider/>
                    {
                        !loading ?
                            <AbsoluteCenter>
                                <Spinner size="xl"/>
                            </AbsoluteCenter>
                            :
                            reports.length > 0 ?
                                <ReportList/> :
                                <AbsoluteCenter>
                                    Employees not found
                                </AbsoluteCenter>

                    }
                </GridItem>
                <ReportsFooter/>
            </Grid>
        </ReportsContext.Provider>
    );
}

export default Reports;