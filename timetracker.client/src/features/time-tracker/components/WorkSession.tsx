import { useDispatch } from "react-redux";
import {PiNotePencil, PiPencil, PiTimer} from "react-icons/pi";
import {Box, Divider, Flex, Icon, Text, useDisclosure} from "@chakra-ui/react";

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
        <Box position="relative">
            {formatTime(totalTime) == "00:00:01" &&
            <Flex  fontSize="xs" borderColor="gray.200"
                   borderRightWidth="2px" borderBottomWidth="2px"
                   px="1" gap="1" position="absolute" left="0" top="0"
                   roundedBottomRight="md"  title="edited by ...">
                <Icon as={PiNotePencil} boxSize="4"></Icon>
                <Text>Edited</Text>
            </Flex>
            }
                <Flex
                    p="5"
                    bg="gray.50"
                    align="center"
                    justify="space-between"
                    w="full"
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
    );
}

export default WorkSession;
