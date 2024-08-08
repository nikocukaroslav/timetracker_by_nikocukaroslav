import { useState } from "react";
import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";
import { Box, Flex, Text } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ConfirmActionWindow from "@components/ui/ConfirmActionWindow.tsx";
import CustomHamburgerMenu from "@components/ui/CustomHamburgerMenu.tsx";

import dateFormatConverter, { formatTime } from "@utils/formatters.ts";
import { deleteWorkSession } from "@features/time-tracker/api/actions.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";

function WorkSession({data}: { data: WorkSessionModel }) {
    const totalTime: number = Math.floor((data.endTime - data.startTime) / 1000);
    const workingTime = `${dateFormatConverter(data.startTime, "long-time")} - ${dateFormatConverter(data.endTime, "long-time")}`;

    const [activeDeleting, setActiveDeleting] = useState(false);

    const dispatch = useDispatch();

    function handleActiveDeleting() {
        setActiveDeleting(!activeDeleting);
    }

    function confirmDeleting() {
        setActiveDeleting(true);
    }

    return (
        <>
            <Box>
                <Flex
                    p="5"
                    bg="gray.50"
                    align="center"
                    justify="space-between"
                >
                    <Flex align="center">
                        <Flex gap="2" align="center" w="96">
                            <PiTimer size="28"/>
                            <Text>{`Working time: ${workingTime}`}</Text>
                        </Flex>
                        <CustomVerticalDivider/>
                        <Text w="36">
                            {`Total: ${formatTime(totalTime)}`}
                        </Text>
                    </Flex>
                    <CustomHamburgerMenu getData confirmAction={confirmDeleting}/>
                </Flex>
            </Box>
            <ConfirmActionWindow
                onDelete={() => dispatch(deleteWorkSession(data.id))}
                isOpen={activeDeleting}
                text={`Delete this work session`}
                onClose={handleActiveDeleting}/>
        </>
    );
}

export default WorkSession;
