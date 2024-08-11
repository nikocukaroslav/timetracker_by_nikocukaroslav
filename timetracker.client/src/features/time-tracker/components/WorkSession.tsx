import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import ActionMenu, { ActionMenuDeleteBtn, ActionMenuEditBtn } from "@components/ui/action-menu";

import dateFormatConverter, { convertToLocalISO, formatTime } from "@utils/formatters.ts";
import { deleteWorkSession } from "@features/time-tracker/api/actions.ts";
import { WorkSessionModel } from "@interfaces/domain.ts";
import CreateEditWorkSessionForm from "@features/time-tracker/components/CreateEditWorkSessionForm.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";

function WorkSession({data}: { data: WorkSessionModel }) {
    const dispatch = useDispatch();
    const userId = useAppSelector(state => state.authentication.user?.id);

    const {id, startTime, endTime, editedAt, editor} = data;

    const totalTime: number = Math.floor((endTime - startTime) / 1000);
    const workingTime = `${dateFormatConverter(startTime, "time")} - ${dateFormatConverter(endTime, "time")}`;

    const formData = {
        id,
        startTime: convertToLocalISO(startTime),
        endTime: convertToLocalISO(endTime),
    };

    function handleDelete() {
        dispatch(deleteWorkSession(id));
    }

    return (
        <>
            <Box>
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
                    {editedAt &&
                        <Text position="absolute" bottom={1} left={6} fontSize={10} color="gray.400">
                            {`edited by `}
                            <Text as="span" fontWeight="800">
                                {editor?.id == userId ? "you" : `${editor?.name} ${editor?.surname}`}
                            </Text>
                            {`, ${dateFormatConverter(editedAt, "full")}`}
                        </Text>
                    }
                    <ActionMenu>
                        <CreateEditWorkSessionForm formData={formData} isEditing>
                            <ActionMenuEditBtn/>
                        </CreateEditWorkSessionForm>
                        <Divider/>
                        <ActionMenuDeleteBtn confirmText="Delete this work session?" onClick={handleDelete}/>
                    </ActionMenu>
                </Flex>
            </Box>

        </>
    );
}

export default WorkSession;
