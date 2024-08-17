import { MutableRefObject, useEffect, useRef } from "react";
import { Center } from "@chakra-ui/react";

import { convertDateToISODate } from "@utils/formatters.ts";

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
    const ref = useRef<HTMLDivElement>(null);

    const today = date.getTime() == new Date(new Date().toDateString()).getTime();
    const textBg = today ? "gray.800" : undefined;
    const textColor = today ? "white" : undefined;

    const isoDate = convertDateToISODate(date);
    const isSelected = selectedItems.includes(isoDate);
    const cellBg = isSelected ? "gray.200" : "gray.100";

    const number = date.getDate();

    useEffect(() => {
        function mouseDown() {
            selecting.current = true;
            onSelect(isoDate);
        }

        function mouseOver() {
            if (selecting.current) {
                onSelect(isoDate);
            }
        }

        ref.current?.addEventListener('mousedown', mouseDown);
        ref.current?.addEventListener('mouseover', mouseOver);
        ref.current?.addEventListener('mouseup', onEndSelect);

        return () => {
            ref.current?.removeEventListener('mousedown', mouseDown);
            ref.current?.removeEventListener('mouseover', mouseOver);
            ref.current?.removeEventListener('mouseup', onEndSelect);
        };
    }, [date]);

    return (
        <Center
            ref={ref}
            position="relative"
            alignItems="start"
            border="1px"
            borderColor="gray.300"
            bg={cellBg}
            userSelect="none"
            cursor="pointer"
            p={1}
            sx={{
                "&:nth-of-type(7n + 6), &:nth-of-type(7n + 7)": {
                    bg: "gray.200"
                }
            }}
        >
            <Center
                position="absolute"
                h={8}
                w={8}
                bg={textBg}
                color={textColor}
                rounded="full"
            >
                {number}
            </Center>
        </Center>
    );
}

export default CalendarCell;
