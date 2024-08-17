import { MutableRefObject, useEffect, useRef } from "react";
import { PiClock } from "react-icons/pi";
import { Center, Stack, Text } from "@chakra-ui/react";

import { convertDateToISODate, timeConverter } from "@utils/formatters.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";

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

    const { startTime, endTime } = workDay || {};
    const tooltipLabel = workDay && `${timeConverter(startTime as string, "hh:mm")} - ${timeConverter(endTime as string, "hh:mm")}`;

    const today = date.getTime() == new Date(new Date().toDateString()).getTime();
    const textBg = today ? "gray.800" : undefined;
    const textColor = today ? "white" : undefined;

    const isSelected = selectedItems.includes(isoDate);
    const cellBg = isSelected ? "gray.400 !important" : "gray.100";

    const number = date.getDate();

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
                <Center position="absolute" top={10} gap={1}>
                    <PiClock size={20}/>
                    <Text>{tooltipLabel}</Text>
                </Center>
            }
        </Stack>
    );
}

export default CalendarCell;
