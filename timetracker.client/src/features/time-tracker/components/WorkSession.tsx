import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";
import { Box, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn } from "@components/ui/ActionMenu";

import dateFormatConverter, { formatTime } from "@utils/formatters.ts";
import { deleteWorkSession } from "@features/time-tracker/api/actions.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";

function WorkSession({data}: { data: WorkSessionModel }) {
    const dispatch = useDispatch();
    const {isOpen: isOpenConfirmWindow, onOpen: onOpenConfirmWindow, onClose: onCloseConfirmWindow} = useDisclosure();

    const totalTime: number = Math.floor((data.endTime - data.startTime) / 1000);
    const workingTime = `${dateFormatConverter(data.startTime, "time")} - ${dateFormatConverter(data.endTime, "time")}`;

    function handleDelete() {
        dispatch(deleteWorkSession(data.id));
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
                    <ActionMenu>
                        <ActionMenuEditBtn onClick={() => {
                        }}/>
                        <Divider/>
                        <ActionMenuDeleteBtn confirmText="Delete this work session?" onClick={() => {
                        }}/>
                    </ActionMenu>
                </Flex>
            </Box>

        </>
    );
}

export default WorkSession;
