import { useDispatch } from "react-redux";
import { PiNotePencil, PiTimer } from "react-icons/pi";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuInfoBtn } from "@components/ui/action-menu";

import dateFormatConverter, { convertToLocalISO, formatTime } from "@utils/formatters.ts";
import { deleteWorkSession } from "@features/time-tracker/api/actions.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { setByList } from "@constants";

function WorkSession({ data }: { data: WorkSessionModel }) {
    const dispatch = useDispatch();
    const userId = useAppSelector(state => state.authentication.user?.id);
    const { id, startTime, endTime, editedAt, editor, setBy } = data;
    const {
        description: descriptionSetBy
    } = setByList.find(SetBy => SetBy.name === setBy) || {};

    const totalTime: number = Math.floor((endTime - startTime) / 1000);
    const workingTime = `${dateFormatConverter(startTime, "time")} - ${dateFormatConverter(endTime, "time")}`;

    const editMessage = editedAt && `Edited by ${editor?.id == userId ? "you" : `${editor?.name} ${editor?.surname}`}, ${dateFormatConverter(editedAt, "full")}`;

    const formData = {
        id,
        startTime: convertToLocalISO(startTime),
        endTime: convertToLocalISO(endTime),
    };

    function handleDelete() {
        dispatch(deleteWorkSession(id));
    }

    return (
        <Box position="relative">
            {editedAt &&
                <Flex fontSize="xs" borderColor="gray.200"
                      borderRightWidth="2px" borderBottomWidth="2px"
                      px="1" gap="1" position="absolute" left="0" top="0"
                      roundedBottomRight="md" zIndex="1">
                    <Icon as={PiNotePencil} boxSize="4"></Icon>
                    <Text>Edited</Text>
                </Flex>
            }
            <Flex
                position="relative"
                align="center"
                justify="space-between"
                p="5"
                bg="gray.50"
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
                    <ActionMenuInfoBtn info={
                        <Box>
                            {descriptionSetBy && (
                                <Text>
                                    Set {descriptionSetBy}
                                </Text>
                            )}
                            {editMessage && (
                                <Text mt={1}>
                                    {editMessage}
                                </Text>
                            )}
                        </Box>
                    }/>
                    <Divider/>
                    <CreateEditWorkSessionForm formData={formData} isEditing>
                        <ActionMenuEditBtn/>
                    </CreateEditWorkSessionForm>
                    <Divider/>
                    <ActionMenuDeleteBtn confirmText="Delete this work session?" onClick={handleDelete}/>
                </ActionMenu>
            </Flex>
        </Box>
    );
}

export default WorkSession;