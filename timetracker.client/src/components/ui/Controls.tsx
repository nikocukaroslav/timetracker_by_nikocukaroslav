import dateConverter from "@utils/formatters.ts";
import { Button, HStack, Text } from "@chakra-ui/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

interface Controls {
    currentDate: string;

    setCurrentDate(date: Date): void;
}

function Controls({ setCurrentDate, currentDate }: Controls) {
    const formattedDate = dateConverter(currentDate, "MMMM yyyy");

    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }

    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }

    return (
        <HStack gap={3} fontWeight="450">
            <Button onClick={prevMonth}><PiCaretLeftBold size="18"/></Button>
            <Text textAlign="center" w={36} fontSize={18}>{formattedDate}</Text>
            <Button onClick={nextMonth}><PiCaretRightBold size="18"/></Button>
        </HStack>
    );
}

export default Controls;