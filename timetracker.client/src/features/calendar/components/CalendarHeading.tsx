import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";

import useTruncate from "@hooks/useTruncate.ts";

function CalendarHeading({ title }: { title: string }) {
    const { ref, truncated, checkTruncate } = useTruncate<HTMLHeadingElement>();

    useEffect(() => {
        checkTruncate();
    }, [title])

    return (
        <Heading ref={ref} title={truncated ? title : undefined} fontSize={24} isTruncated>
            {title}
        </Heading>
    );
}

export default CalendarHeading;
