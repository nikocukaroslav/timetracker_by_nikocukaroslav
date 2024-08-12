import { useDispatch } from "react-redux";
import { PiNotePencil, PiTimer } from "react-icons/pi";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn } from "@components/ui/action-menu";

import dateFormatConverter, { convertToLocalISO, formatTime } from "@utils/formatters.ts";
import { deleteWorkSession } from "@features/time-tracker/api/actions.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { setByList } from "@constants";
import { ActionMenuInfoBtn } from "@components/ui/action-menu/ActionMenuInfoBtn.tsx";

function WorkSession({ data }: { data: WorkSessionModel }) {
    const dispatch = useDispatch();
    const userId = useAppSelector(state => state.authentication.user?.id);
    const { id, startTime, endTime, editedAt, editor, setBy } = data;
    const {
        description: setByDescription
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
                <Flex
                    position="absolute"
                    align="center"
                    top={0}
                    left={0}
                    h="40%"
                    p="1"
                    roundedLeft="2px"
                    roundedRight="2px"
                    zIndex={1}
                >
                    <Icon as={PiNotePencil} boxSize="4" color="black"></Icon>
                </Flex>
            }
            <Flex
                position="relative"
                align="center"
                justify="space-between"
                p="1rem 1rem 1rem 2rem"
                bg="gray.50"
            >
                <Flex align="center">
                    <Flex gap="2" align="center" w="96" position="relative">
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
                            {setByDescription && (
                                <Text>
                                    Set {setByDescription}
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