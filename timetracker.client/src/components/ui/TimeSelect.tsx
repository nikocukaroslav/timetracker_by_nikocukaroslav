import { Select, SelectProps } from "@chakra-ui/react";

import { workTime } from "@constants";

function TimeSelect(props: SelectProps) {
    return (
        <Select {...props}>
            {
                workTime.map((time, i) =>
                    <option key={i} value={time}>{time}</option>
                )
            }
        </Select>
    );
}

export default TimeSelect;
