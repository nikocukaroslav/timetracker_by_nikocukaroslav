import { PiNotePencil } from "react-icons/pi";
import { MenuItem } from "@chakra-ui/react";

import { ActionMenuBtnProps } from "@interfaces/components.ts";

export const ActionMenuEditBtn = ({onClick}: ActionMenuBtnProps) => (
    <MenuItem icon={<PiNotePencil size="24px"/>} onClick={onClick}>
        Edit
    </MenuItem>
);