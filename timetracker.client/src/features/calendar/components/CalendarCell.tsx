import { MutableRefObject, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PiClock, PiPencilSimple, PiTrash } from "react-icons/pi";
import { Center, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";

import CreateEditWorkDayForm from "@features/calendar/components/CreateEditWorkDayForm.tsx";
import ConfirmWindow from "@components/ui/ConfirmWindow.tsx";

import { convertDateToISODate, timeConverter } from "@utils/formatters.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { deleteWorkDay, updateWorkDay } from "@features/calendar/api/actions.ts";

function CalendarCell({
                          selecting,
                          date,
                          selectedItems,
                          onEndSelect,
                          onSelect,
                      }: {
    selecting: MutableRefObject<boolean>,
    date: Date,
    selectedItems: string[],
    onEndSelect: () => void,
    onSelect: (day: string) => void,
}) {
    const isoDate = convertDateToISODate(date);
    const workDay = useAppSelector((state) => state.calendar.workDays.find(({ day }) => day == isoDate));
    const ref = useRef<HTMLDivElement>(null);

    const { id, day, startTime, endTime } = workDay || {};
    const tooltipLabel = workDay && `${timeConverter(startTime as string, "hh:mm")} - ${timeConverter(endTime as string, "hh:mm")}`;

    const today = date.getTime() == new Date(new Date().toDateString()).getTime();
    const textBg = today ? "gray.800" : undefined;
    const textColor = today ? "white" : undefined;

    const isSelected = selectedItems.includes(isoDate);
    const cellBg = isSelected ? "gray.400 !important" : "gray.100";

    const number = date.getDate();

    const dispatch = useDispatch();
    const disclosure = useDisclosure();

    const { onOpen } = disclosure;

    function handleUpdate({ startTime, endTime }: { startTime: string; endTime: string }) {
        const updatedWorkDay = {
            id: id as string,
            day: day as string,
            startTime: timeConverter(startTime),
            endTime: timeConverter(endTime),
        }

        dispatch(updateWorkDay(updatedWorkDay))
    }

    function handleDelete() {
        dispatch(deleteWorkDay(id as string));
    }

    useEffect(() => {
        function mouseDown(e: MouseEvent) {
            if (e.buttons === 1) {
                selecting.current = true;
                onSelect(isoDate);
            }
        }

        function mouseOver(e: MouseEvent) {
            if (e.buttons === 1 && selecting.current) {
                onSelect(isoDate);
            }
        }

        if (!workDay) {
            ref.current?.addEventListener('mousedown', mouseDown);
            ref.current?.addEventListener('mouseover', mouseOver);
        }

        ref.current?.addEventListener('mouseup', onEndSelect);

        return () => {
            ref.current?.removeEventListener('mousedown', mouseDown);
            ref.current?.removeEventListener('mouseover', mouseOver);
            ref.current?.removeEventListener('mouseup', onEndSelect);
        };
    }, [date, workDay]);

    return (
        <Stack
            ref={ref}
            role="group"
            position="relative"
            alignItems="center"
            border="1px"
            borderColor="gray.300"
            bg={cellBg}
            userSelect="none"
            cursor="pointer"
            p={1}
            spacing={1}
            sx={{
                "&:nth-of-type(7n + 6), &:nth-of-type(7n + 7)": {
                    bg: "gray.200"
                }
            }}
        >
            <Center
                h={8}
                w={8}
                bg={textBg}
                color={textColor}
                rounded="full"
            >
                {number}
            </Center>
            {workDay &&
                <>
                    <Center position="absolute" top={10} gap={1}>
                        <PiClock size={20}/>
                        <Text>{tooltipLabel}</Text>
                    </Center>
                    <HStack
                        position="absolute"
                        display="none"
                        right={1}
                        bottom={1}
                        spacing={1}
                        _groupHover={{
                            display: "flex"
                        }}
                    >
                        <Center onClick={onOpen} _hover={{ bg: "gray.200" }} p={1.5} rounded="md">
                            <PiPencilSimple size={20} title="Edit"/>
                        </Center>
                        <ConfirmWindow onConfirm={handleDelete} text="Delete this work day?">
                            <Center _hover={{ bg: "red.100" }} p={1.5} rounded="md">
                                <PiTrash title="Delete" color="red" size={20}/>
                            </Center>
                        </ConfirmWindow>
                    </HStack>
                    <CreateEditWorkDayForm
                        disclosure={disclosure}
                        formData={{
                            startTime: startTime as string,
                            endTime: endTime as string
                        }}
                        onUpdate={handleUpdate}
                        isEditing
                    />
                </>
            }
        </Stack>
    );
}

export default CalendarCell;
