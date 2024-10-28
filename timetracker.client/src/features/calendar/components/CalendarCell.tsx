import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PiClock, PiPlus } from "react-icons/pi";
import { Button, Center, Flex, Stack, useDisclosure } from "@chakra-ui/react";

import CreateEditWorkDayForm from "@features/calendar/components/CreateEditWorkDayForm.tsx";

import { convertDateToISODate, convertTime } from "@utils/formatters.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { deleteWorkDay, updateWorkDay } from "@features/calendar/api/actions.ts";
import { CalendarContext } from "@features/calendar/context/calendarContext.tsx";
import { CalendarContextType } from "@features/calendar/types/calendar.ts";
import TitledText from "@components/ui/TitledText.tsx";
import WorkDayInfo from "@features/calendar/components/WorkDayInfo.tsx";
import WorkDayOptions from "@features/calendar/components/WorkDayOptions.tsx";

interface CalendarCellProps {
    selecting: MutableRefObject<boolean>,
    date: Date,
    selectedItems: string[],
    onEndSelect: () => void,
    onSelect: (day: string) => void,
    handleCreate: ({ startTime, endTime }: { startTime: string; endTime: string }) => void
}

function CalendarCell({ selecting, date, selectedItems, onEndSelect, onSelect, handleCreate }: CalendarCellProps) {
    const isoDate = convertDateToISODate(date);
    const workDays = useAppSelector((state) => state.calendar.workDays.filter(({ day }) => day == isoDate));
    const ref = useRef<HTMLDivElement>(null);

    const today = date.getTime() == new Date(new Date().toDateString()).getTime();
    const textBg = today ? "gray.800" : undefined;
    const textColor = today ? "white" : undefined;

    const isSelected = selectedItems.includes(isoDate);
    const cellBg = isSelected ? "gray.400 !important" : "gray.100";

    const isContainsWorkDays = workDays.length > 0

    const number = date.getDate();

    const dispatch = useDispatch();
    const updateFormDisclosure = useDisclosure();
    const createFormDisclosure = useDisclosure();
    const infoDisclosure = useDisclosure();
    const { showMode } = useContext(CalendarContext) as CalendarContextType;

    const { onOpen } = updateFormDisclosure;

    function handleUpdate(workDayId: string, updatedTime: { startTime: string; endTime: string }) {
        dispatch(updateWorkDay({
            ...updatedTime,
            id: workDayId
        }))
    }

    function handleDelete(workDayId: string) {
        dispatch(deleteWorkDay(workDayId));
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

        if (!isContainsWorkDays) {
            ref.current?.addEventListener('mousedown', mouseDown);
            ref.current?.addEventListener('mouseover', mouseOver);
        }

        ref.current?.addEventListener('mouseup', onEndSelect);

        return () => {
            ref.current?.removeEventListener('mousedown', mouseDown);
            ref.current?.removeEventListener('mouseover', mouseOver);
            ref.current?.removeEventListener('mouseup', onEndSelect);
        };
    }, [date, workDays]);

    return (
        <Stack
            ref={ref}
            minH={32}
            overflow="hidden"
            role="group"
            position="relative"
            border="1px"
            borderColor="gray.300"
            bg={cellBg}
            userSelect="none"
            cursor={showMode ? "default" : "pointer"}
            py={1}
            px={2}
            spacing={1}
            sx={{
                "&:nth-of-type(7n + 6), &:nth-of-type(7n + 7)": {
                    bg: "gray.200",
                },
            }}
        >
            <Center mx="auto" h={8} w={8} bg={textBg} color={textColor} rounded="full">
                {number}
            </Center>
            <Stack>
                {workDays.slice(0, 2).map(({ id, startTime, endTime }) => (
                    <Flex key={id} alignItems="center" justifyContent="space-between">
                        <Center gap={1} py={0.5}>
                            <PiClock size={18}/>
                            <TitledText>
                                {convertTime(startTime as string, "hh:mm")} - {convertTime(endTime as string, "hh:mm")}
                            </TitledText>
                        </Center>
                        {!showMode && (
                            <>
                                <WorkDayOptions handleDelete={handleDelete}
                                                onOpen={onOpen} id={id} visibleOnHover/>
                                <CreateEditWorkDayForm
                                    disclosure={updateFormDisclosure}
                                    formData={{ startTime, endTime }}
                                    onUpdate={(updatedTime) => handleUpdate(id, updatedTime)}
                                    isEditing
                                />
                            </>
                        )}
                    </Flex>
                ))}
            </Stack>
            {workDays.length > 2 &&
                <Button h={6} w={16} fontWeight="500" onClick={infoDisclosure.onOpen} fontSize="sm">More...</Button>}
            <WorkDayInfo onClose={infoDisclosure.onClose} isOpen={infoDisclosure.isOpen}
                         workDays={workDays} handleDelete={handleDelete} onOpen={onOpen}
            />
            {isContainsWorkDays &&
                <Center onClick={createFormDisclosure.onOpen} position="absolute" _hover={{ bg: "gray.200" }} p={2}
                        rounded="md" right={1}>
                    <PiPlus/>
                </Center>}
            <CreateEditWorkDayForm
                disclosure={createFormDisclosure}
                onCreate={handleCreate}
            />
        </Stack>
    );
}

export default CalendarCell;
