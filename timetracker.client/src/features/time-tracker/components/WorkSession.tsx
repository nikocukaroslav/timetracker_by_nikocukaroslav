import { useDispatch } from "react-redux";
import { PiPencilSimple, PiTimer } from "react-icons/pi";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn, ActionMenuInfoBtn } from "@components/ui/action-menu";

import dateConverter, { convertTime, convertToLocalISO, formatTime } from "@utils/formatters.ts";
import { deleteWorkSession } from "@features/time-tracker/api/actions.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { setByList } from "@constants";

function WorkSession({ data }: { data: WorkSessionModel }) {
    const userId = useAppSelector(state => state.authentication.user?.id);

    const dispatch = useDispatch();

    const { id, startTime = 0, endTime = 0, editedAt, editor, setBy } = data;
    const {
        description: descriptionSetBy
    } = setByList.find(SetBy => SetBy.name === setBy) || {};

    const totalTime = Math.floor((endTime - startTime) / 1000);
    const workingTime = `${convertTime(startTime)} - ${convertTime(endTime)}`;

    const editMessage = editedAt && `Edited by ${editor?.id == userId ? "you" : `${editor?.name} ${editor?.surname}`}, ${dateConverter(editedAt, "full")}`;

    const formData = {
        id,
        startTime: convertToLocalISO(startTime),
        endTime: convertToLocalISO(endTime),
    };

    function handleDelete() {
        dispatch(deleteWorkSession(id));
    }

    return (
        <Flex
            position="relative"
            align="center"
            justify="space-between"
            p={4}
            bg="gray.50"
        >
            <Flex align="center">
                <Flex gap="2" align="center" w={96}>
                    <PiTimer size="28"/>
                    <Text>{`Working time: ${workingTime}`}</Text>
                </Flex>
                <CustomVerticalDivider/>
                <Text w="36">
                    {`Total: ${formatTime(totalTime)}`}
                </Text>
            </Flex>
            {editedAt &&
                <Flex
                    alignItems="center"
                    rounded="md"
                    px={2}
                    gap={2}
                    borderColor="gray.300"
                    borderWidth={2}
                >
                    <Icon as={PiPencilSimple} boxSize="4"></Icon>
                    <Text>Edited</Text>
                </Flex>
            }
            <ActionMenu>
                <ActionMenuInfoBtn info={
                    <Box>
                        {descriptionSetBy && <Text>Set {descriptionSetBy}</Text>}
                        {editMessage && <Text mt={1}>{editMessage}</Text>}
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
    );
}

export default WorkSession;